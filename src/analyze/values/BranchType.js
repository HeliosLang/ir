export {}

/**
 * @typedef {"ifThenElse" | "chooseList" | "chooseData"} BranchType
 */

/**
 * @param {BranchType} type
 * @returns {"Ite" | "Cl" | "Cd"}
 */
export function branchTypeToPrefix(type) {
    return /** @type {const} */ ({
        ifThenElse: "Ite",
        chooseList: "Cl",
        chooseData: "Cd"
    })[type]
}
