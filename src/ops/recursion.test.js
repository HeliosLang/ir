import { strictEqual, throws } from "node:assert"
import { describe, it } from "node:test"
import { format } from "../format/index.js"
import { parse } from "../parse/index.js"
import { injectRecursiveDeps } from "./recursion.js"

/**
 * @typedef {import("../parse/index.js").ParseOptions} ParseOptions
 */

describe(injectRecursiveDeps.name, () => {
    it("correctly orders two functions where the former depends on the latter", () => {
        const expr = parse(
            `a = b;
            b = 0;
            a`
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(format(newExpr), `b = 0;\na = b;\na`)
    })

    it("correctly inject 'a' into 'a = (list) -> {...}; a(makeEmptyList(()))'", () => {
        const expr = parse(
            `a = (list) -> {chooseList(list,0,addInteger(1, a(tailList__safe(list))))}; a(mkNilData(()))`
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            format(newExpr),
            `a = (a) -> {
    (list) -> {
        chooseList(list, 0, addInteger(1, a(a)(tailList__safe(list))))
    }
};
a(a)(mkNilData(()))`
        )
    })

    it("fails for (a, b) -> {addInteger(a,b)}(0)", () => {
        throws(() => {
            const expr = parse(`(a, b) -> {addInteger(a,b)}(0)`)

            injectRecursiveDeps(expr)
        })
    })

    it("works for 'a=b;b=addInteger(c,d);c=addInteger(a,e);d=0;e=1;f=c;f'", () => {
        const expr = parse(
            "a=b;b=addInteger(c,d);c=addInteger(a,e);d=0;e=1;f=c;f"
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            format(newExpr),
            `d = 0;
e = 1;
a = (a, b, c) -> {
    b(a, b, c)
};
b = (a, b, c) -> {
    addInteger(c(a, b, c), d)
};
c = (a, b, c) -> {
    addInteger(a(a, b, c), e)
};
f = c(a, b, c);
f`
        )
    })

    it("works for name that is internally shadowed", () => {
        const expr = parse(
            "a = (list) -> {chooseList(list, (a) -> {a}, (b) -> {addInteger(a(tailList__safe(list)), b)})(1)}; a(mkNilData(()))"
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            format(newExpr),
            `a = (a) -> {
    (list) -> {
        chooseList(list, (a) -> {
            a
        }, (b) -> {
            addInteger(a(a)(tailList__safe(list)), b)
        })(1)
    }
};
a(a)(mkNilData(()))`
        )
    })
})
