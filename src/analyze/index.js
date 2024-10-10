export {
    BranchedValue,
    Branches,
    DataValue,
    ErrorValue,
    FuncValue,
    LiteralValue
} from "./values/index.js"
export { Analysis } from "./Analysis.js"
export { Analyzer } from "./Analyzer.js"
export { annotate } from "./annotate.js"

/**
 * @typedef {import("./values/index.js").Branch} Branch
 * @typedef {import("./values/index.js").BranchesGroup} BranchesGroup
 * @typedef {import("./values/index.js").BranchesI} BranchesI
 * @typedef {import("./annotate.js").AnnotateAnalysisOptions} AnnotateAnalysisOptions
 */
