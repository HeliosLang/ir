import { Source } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/compiler-utils").SourceMap} SourceMap
 */

export class SourceMappedString {
    /**
     * @readonly
     * @type {string | SourceMappedString[]}
     */
    content

    /**
     * @readonly
     * @type {Option<Site>}
     */
    site

    /**
     * @param {string | SourceMappedString[]} content
     * @param {Option<Site>} site
     */
    constructor(content, site = None) {
        this.content = content
        this.site = site
    }

    /**
     * Returns a list containing SourceMappedString instances that themselves only contain strings
     * @internal
     * @returns {SourceMappedString[]}
     */
    flatten() {
        if (typeof this.content == "string") {
            return [this]
        } else {
            /**
             * @type {SourceMappedString[]}
             */
            let result = []

            for (let item of this.content) {
                result = result.concat(item.flatten())
            }

            return result
        }
    }

    /**
     * @param {string} str
     * @returns {boolean}
     */
    includes(str) {
        if (typeof this.content == "string") {
            return this.content.includes(str)
        } else {
            return this.content.some((ir) => ir.includes(str))
        }
    }

    /**
     * Intersperse nested IR content with a separator
     * @internal
     * @param {string} sep
     * @returns {SourceMappedString}
     */
    join(sep) {
        if (typeof this.content == "string") {
            return this
        } else {
            /**
             * @type {SourceMappedString[]}
             */
            const result = []

            for (let i = 0; i < this.content.length; i++) {
                result.push(this.content[i])

                if (i < this.content.length - 1) {
                    result.push(new SourceMappedString(sep))
                }
            }

            return new SourceMappedString(result)
        }
    }

    /**
     * @param {RegExp} re
     * @param {string} newStr
     * @returns {SourceMappedString}
     */
    replace(re, newStr) {
        if (typeof this.content == "string") {
            return new SourceMappedString(
                this.content.replace(re, newStr),
                this.site
            )
        } else {
            return new SourceMappedString(
                this.content.map((ir) => ir.replace(re, newStr), this.site)
            )
        }
    }

    /**
     *
     * @param {RegExp} re
     * @param {(match: string) => void} callback
     */
    search(re, callback) {
        if (typeof this.content == "string") {
            const ms = this.content.match(re)

            if (ms) {
                for (let m of ms) {
                    callback(m)
                }
            }
        } else {
            this.content.forEach((ir) => ir.search(re, callback))
        }
    }

    /**
     * @param {boolean} pretty
     * @returns {string}
     */
    toString(tab = "    ", pretty = false) {
        if (pretty) {
            const [src, _] = this.toStringWithSourceMap()

            return new Source(src).pretty()
        } else {
            return this.flatten()
                .map((p) => (typeof p.content == "string" ? p.content : ""))
                .join("")
        }
    }

    /**
     * @param {string} tab
     * @returns {[string, SourceMap]}
     */
    toStringWithSourceMap(tab = "    ") {
        const parts = this.flatten()

        /**
         * @type {string[]}
         */
        const partSrcs = []

        /**
         * @type {SourceMap}
         */
        const sourceMap = new Map()

        let pos = 0
        for (let part of parts) {
            const rawPartSrc = part.content

            if (typeof rawPartSrc == "string") {
                const origSite = part.site

                if (origSite) {
                    sourceMap.set(pos, origSite)
                }

                const partSrc = rawPartSrc.replace(new RegExp("\t", "g"), tab)

                pos += partSrc.length
                partSrcs.push(partSrc)
            } else {
                throw new Error(
                    "expected IR to contain only strings after flatten"
                )
            }
        }

        return [partSrcs.join(""), sourceMap]
    }
}

/**
 * Shorthand for `new SourceMappedString()`, which can also be used with template string literals
 * This is used very frequently by the code generation of the higher-level language
 * @param {string | TemplateStringsArray | SourceMappedString[]} content
 * @param {...(Site | string | SourceMappedString | SourceMappedString[] | null | number)} args
 * @returns {SourceMappedString}
 */
export function $(content, ...args) {
    if (typeof content == "string") {
        if (args.length == 0) {
            return new SourceMappedString(content)
        } else if (args.length == 1) {
            const site = args[0]

            if (
                typeof site == "string" ||
                typeof site == "number" ||
                site === null ||
                site instanceof SourceMappedString ||
                Array.isArray(site)
            ) {
                throw new Error("unexpected second argument")
            } else {
                return new SourceMappedString(content, site)
            }
        } else {
            throw new Error("unexpected third argument")
        }
    } else if ("raw" in content) {
        const raw = content.raw.slice()

        /**
         * @type {SourceMappedString[]}
         */
        const items = []

        let s = ""

        for (let c of raw) {
            s += c

            const a = args.shift()

            if (a instanceof SourceMappedString) {
                if (s != "") {
                    items.push(new SourceMappedString(s))
                    s = ""
                }

                items.push(a)
            } else if (Array.isArray(a)) {
                if (s != "") {
                    items.push(new SourceMappedString(s))
                    s = ""
                }

                a.forEach((ir) => items.push(ir))
            } else if (typeof a == "string" || typeof a == "number") {
                s += a.toString()
            } else if (a === undefined || a === null) {
                if (s != "") {
                    items.push(new SourceMappedString(s))
                    s = ""
                }
            } else {
                throw new Error(
                    "unexpected second argument (Site not allowable as template argument due to ambiguity of placement)"
                )
            }
        }

        if (args.length != 0) {
            throw new Error("unexpected")
        }

        if (s != "") {
            items.push(new SourceMappedString(s))
        }

        return new SourceMappedString(items)
    } else if (Array.isArray(content)) {
        /**
         * @type {SourceMappedString[]}
         */
        const items = []

        for (let c of content) {
            items.push(c)
        }

        if (args.length == 0) {
            return new SourceMappedString(items)
        } else if (args.length == 1) {
            const site = args[0]

            if (
                typeof site == "string" ||
                typeof site == "number" ||
                site === null ||
                site instanceof SourceMappedString ||
                Array.isArray(site)
            ) {
                throw new Error("unexpected second argument")
            } else {
                return new SourceMappedString(items, site)
            }
        } else {
            throw new Error("unexpected third argument")
        }
    } else {
        throw new Error("unexpected first argument")
    }
}
