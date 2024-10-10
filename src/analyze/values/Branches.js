import { branchesAreEqual } from "./Branch.js"

/**
 * @typedef {import("./Branch.js").Branch} Branch
 */

/**
 * @typedef {{
 *   root: BranchesI
 *   entries: number[]
 * }} BranchesGroup
 */

/**
 * @typedef {{
 *   branches: Branch[]
 *   length: number
 *   addBranch(branch: Branch): BranchesI
 *   prependBranch(branch: Branch): BranchesI
 *   hasRoot(root: BranchesI): boolean
 *   isEmpty(): boolean
 *   isEqual(other: BranchesI): boolean
 * }} BranchesI
 */

/**
 * @implements {BranchesI}
 */
export class Branches {
    /**
     * @readonly
     * @type {Branch[]}
     */
    branches

    /**
     *
     * @param {Branch[]} branches
     */
    constructor(branches) {
        this.branches = branches
    }

    static empty() {
        return new Branches([])
    }

    /**
     * @param {BranchesI[]} branches
     * @returns {BranchesGroup[]}
     */
    static group(branches) {
        let tmp = branches.slice()

        // sort shortest first
        tmp.sort((a, b) => a.length - b.length)

        /**
         * @type {BranchesGroup[]}
         */
        const groups = []

        let head = tmp.shift()

        while (head) {
            const shortest = head
            const entries = branches
                .map((b, i) => (b.hasRoot(shortest) ? i : -1))
                .filter((i) => i >= 0)

            groups.push({
                root: shortest,
                entries: entries
            })

            tmp = tmp.filter((b) => !b.hasRoot(shortest))

            head = tmp.shift()
        }

        return groups
    }

    /**
     * @type {number}
     */
    get length() {
        return this.branches.length
    }

    /**
     * @param {Branch} branch
     * @returns {BranchesI}
     */
    addBranch(branch) {
        return new Branches(this.branches.concat([branch]))
    }

    /**
     * @param {Branch} branch
     * @returns {BranchesI}
     */
    prependBranch(branch) {
        return new Branches([branch].concat(this.branches))
    }

    /**
     * @param {BranchesI} root
     * @returns {boolean}
     */
    hasRoot(root) {
        return (
            root.length <= this.length &&
            root.branches.every((b, i) => branchesAreEqual(b, this.branches[i]))
        )
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this.branches.length == 0
    }

    /**
     * @param {BranchesI} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            this.branches.length == other.branches.length &&
            this.branches.every((b, i) =>
                branchesAreEqual(b, other.branches[i])
            )
        )
    }
}
