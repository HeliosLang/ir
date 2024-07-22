export {}

/**
 * @typedef {"ifThenElse" | "chooseList" | "chooseData"} BranchType
 */

/**
 * @param {BranchType} type
 */
export function branchTypeToPrefix(type) {
    return {
        ifThenElse: "Ite",
        chooseList: "Cl",
        chooseData: "Cd"
    }[type]
}
