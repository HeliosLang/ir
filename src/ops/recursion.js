import { Word } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
import {
    CallExpr,
    FuncExpr,
    NameExpr,
    Scope,
    Variable
} from "../expressions/index.js"
import { deconstructFuncBody } from "./deconstruct.js"
import { loop } from "./loop.js"
import { mutate } from "./mutate.js"
import { reconstructFuncBody } from "./reconstruct.js"
import { format } from "../format/index.js"
import { resetVariables } from "./reset.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./deconstruct.js").DeconstructedDef} DeconstructedDef
 */

/**
 * @typedef {{
 *   defs: DeconstructedDef[]
 *   return: Expr
 * }} DeconstructedBodyExpr
 */

/**
 * @typedef {{
 *   allDeps: Set<string>
 *   defs: DeconstructedDef[]
 * }} DefGroup
 */

/**
 * @param {Expr} root
 * @returns {Expr}
 */
export function injectRecursiveDeps(root) {
    const dummyVariable = new Variable(new Word(".dummy"))
    const scope = new Scope(None, None, { dummyVariable })

    root.resolveNames(scope)

    /**
     * @type {Expr}
     */
    let wrapped = new FuncExpr(root.site, [], root)
    wrapped = mutate(wrapped, {
        funcExpr: (funcExpr) => {
            let body = injectRecursiveDepsInternal(funcExpr.body, dummyVariable)

            return new FuncExpr(funcExpr.site, funcExpr.args, body)
        },
        flattenDefs: true
    })

    if (!(wrapped instanceof FuncExpr)) {
        throw new Error("unexpected")
    }

    const result = wrapped.body

    return resetVariables(result)
}

/**
 * @param {Expr} body
 * @param {Variable} dummyVariable
 * @returns {Expr}
 */
function injectRecursiveDepsInternal(body, dummyVariable) {
    const [defs, final] = deconstructFuncBody(body)

    if (defs.length > 0) {
        linkDirectDeps(defs, dummyVariable)
        linkAllDeps(defs)

        const groups = groupDefsByDeps(defs)
        const finalDefs = orderDefsByDeps(groups)

        const newBody = reconstructFuncBody(
            ...injectMutualDependencies(finalDefs, final, dummyVariable)
        )

        return newBody
    } else {
        return body
    }
}

/**
 * @param {DeconstructedDef[]} defs
 * @param {Variable} dummyVariable
 */
function linkDirectDeps(defs, dummyVariable) {
    const defsMap = new Map(defs.map((d) => [d.name, d]))

    // create the dependency graph
    defs.forEach((def) => {
        /**
         * @type {Set<string>}
         */
        const deps = new Set()

        loop(def.value, {
            nameExpr: (nameExpr) => {
                if (nameExpr.variable == dummyVariable) {
                    if (defs.some((d) => d.name.name.value == nameExpr.name)) {
                        deps.add(nameExpr.name)
                    }
                } else if (defsMap.has(nameExpr.variable)) {
                    deps.add(nameExpr.name)
                }
            }
        })

        def.directDeps = Array.from(deps)
    })
}

/**
 * @param {DeconstructedDef[]} defs
 */
function linkAllDeps(defs) {
    defs.forEach((def) => {
        const allDeps = new Set()
        let stack = def.directDeps.slice()

        let head = stack.pop()

        while (head) {
            if (!allDeps.has(head)) {
                allDeps.add(head)

                if (head != def.name.name.value) {
                    const d = defs.find((d) => d.name.name.value == head)

                    if (d) {
                        stack = stack.concat(d.directDeps)
                    }
                }
            }

            head = stack.pop()
        }

        def.allDeps = allDeps
    })
}

/**
 * Keep the original order as much as possible
 * @param {DeconstructedDef[]} defs
 * @returns {DefGroup[]}
 */
function groupDefsByDeps(defs) {
    /**
     * @type {DefGroup[]}
     */
    const groups = []

    defs.forEach((def) => {
        if (!def.allDeps.has(def.name.name.value)) {
            groups.push({
                defs: [def],
                allDeps: def.allDeps
            })
        } else {
            const i = groups.findIndex((g) => {
                return (
                    g.allDeps.size == def.allDeps.size &&
                    Array.from(g.allDeps).every((d) => def.allDeps.has(d))
                )
            })

            if (i == -1) {
                groups.push({
                    defs: [def],
                    allDeps: def.allDeps
                })
            } else {
                const g = groups[i]
                g.defs.push(def)
            }
        }
    })

    return groups
}

/**
 * @param {DefGroup[]} groups
 */
function dumpGroups(groups) {
    groups.forEach((g, i) => {
        console.log(
            `group ${i}:`,
            g.defs.map((def) => def.name.name.value),
            Array.from(g.allDeps)
        )
    })
}

/**
 * @param {DefGroup} group
 * @param {Site} site
 * @returns {Variable[]} - unique variables every time this function is called
 */
function getGroupRecursiveDeps(group, site) {
    if (
        group.defs.length == 1 &&
        !group.allDeps.has(group.defs[0].name.name.value)
    ) {
        return []
    } else {
        return group.defs
            .map((def) => def.name.name.value)
            .sort()
            .map((dep) => new Variable(new Word(dep, site)))
    }
}

/**
 * @param {DefGroup[]} groups
 * @returns {DeconstructedDef[]}
 */
function orderDefsByDeps(groups) {
    /**
     * @type {Set<string>}
     */
    const done = new Set()

    /**
     * @type {DeconstructedDef[]}
     */
    let defs = []

    groups = groups.slice()

    while (groups.length > 0) {
        // first take defs whose deps have all been handled
        /**
         * @type {Set<number>}
         */
        const doneGroups = new Set()

        for (let i = 0; i < groups.length; i++) {
            const g = groups[i]

            if (Array.from(g.allDeps).every((dep) => done.has(dep))) {
                defs = defs.concat(g.defs)
                g.defs.forEach((def) => {
                    done.add(def.name.name.value)
                    def.recursiveDeps = getGroupRecursiveDeps(g, def.callSite)
                })
                doneGroups.add(i)
            }
        }

        if (doneGroups.size > 0) {
            groups = groups.filter((_g, i) => !doneGroups.has(i))
        } else {
            // take the next group which has all defs as its own deps, and all other deps have already been done
            const i = groups.findIndex((g) => {
                return (
                    g.defs.every((d) => g.allDeps.has(d.name.name.value)) &&
                    Array.from(g.allDeps).every(
                        (d) =>
                            g.defs.some((def) => def.name.name.value == d) ||
                            done.has(d)
                    )
                )
            })

            if (i == -1) {
                throw new Error("unable to find suitable group of definitions")
            }

            const g = groups[i]
            groups = groups.filter((_g, j) => j != i)

            defs = defs.concat(g.defs)
            g.defs.forEach((def) => {
                done.add(def.name.name.value)
                def.recursiveDeps = getGroupRecursiveDeps(g, def.callSite)
            })
        }
    }

    return defs
}

/**
 * @param {DeconstructedDef[]} defs
 * @param {Expr} final
 * @param {Variable} dummyVariable
 * @returns {[DeconstructedDef[], Expr]}
 */
function injectMutualDependencies(defs, final, dummyVariable) {
    const defsMap = new Map(defs.map((d) => [d.name, d]))

    /**
     * @param {NameExpr} name
     * @returns {Option<Variable[]>}
     */
    function getDeps(name) {
        const d =
            name.variable == dummyVariable
                ? defs.find((def) => def.name.name.value == name.name)
                : defsMap.get(name.variable)

        if (!d) {
            return None
        }

        return d.recursiveDeps
    }

    /**
     * @type {{nameExpr: (nameExpr: NameExpr) => Expr}}
     */
    const mutations = {
        nameExpr: (nameExpr) => {
            const deps = getDeps(nameExpr)

            if (deps) {
                const site = nameExpr.site

                if (deps.length == 0) {
                    return nameExpr
                } else {
                    const ownDep = deps.find(
                        (d) => d.name.value == nameExpr.name
                    )

                    if (!ownDep) {
                        throw new Error("unexpected")
                    }

                    return new CallExpr(
                        site,
                        new NameExpr(
                            new Word(nameExpr.name, nameExpr.site),
                            ownDep
                        ),
                        deps.map(
                            (dep) =>
                                new NameExpr(
                                    new Word(dep.name.value, site),
                                    dep
                                )
                        )
                    )
                }
            } else {
                return nameExpr
            }
        }
    }

    defs.forEach((def) => {
        def.value = mutate(def.value, mutations)
    })

    final = mutate(final, mutations)

    return [defs, final]
}
