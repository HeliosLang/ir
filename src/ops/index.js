export {
    collectUsedVariables,
    collectVariableNameExprs,
    collectParams
} from "./collect.js"
export { compile, prepare } from "./compile.js"
export { loop, containsCallExprs } from "./loop.js"
export { mutate } from "./mutate.js"
export { Optimizer, DEFAULT_OPTIMIZER_OPTIONS } from "./Optimizer.js"
export { optimize } from "./optimize.js"
export { injectRecursiveDeps } from "./recursion.js"
export { resetVariables } from "./reset.js"

/**
 * @typedef {import("./optimize.js").OptimizeOptions} OptimizeOptions
 * @typedef {import("./Optimizer.js").OptimizerOptions} OptimizerOptions
 */
