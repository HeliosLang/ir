/**
 * each FuncExpr needs a unique tag, so that hashing different FuncExprs with the same args and bodies leads to a different unique id
 */
export class ExprTagger {
    #tag

    constructor() {
        this.#tag = 0
    }

    genTag() {
        this.#tag += 1

        return this.#tag
    }
}
