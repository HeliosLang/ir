import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import {
    makeBasicUplcLogger,
    makeConstrData,
    makeUplcDataValue,
    decodeUplcData,
    makeIntData,
    makeUplcInt,
    makeUplcBool
} from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2} UplcProgramV2
 */

test("unoptimized and optimized CapoMinter behave the same", () => {
    const unoptimizedIR = `(__REDEEMER, __CONTEXT) -> {
    __helios__common__filter = (self_67, nil) -> {
        recurse_53 = (recurse_52, self_68) -> {
            __core__chooseList(self_68, () -> {
                nil
            }, () -> {
                __core__mkCons(__core__headList__safe(self_68), recurse_52(recurse_52, __core__tailList__safe(self_68)))
                    
            })()
        };
        recurse_53(recurse_53, self_67)
    };
    __helios__scriptcontext__tx = __core__headList(__core__sndPair(__core__unConstrData(__CONTEXT)));
    __core__ifThenElse(
        __REDEEMER,
        () -> {
            __helios__common__filter(
                __core__unMapData(__core__headList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx)))))))), 
                __core__mkNilPairData(())
            )
        },
        () -> {
            __helios__common__filter(
                __core__unListData(__core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx)))))), 
                __core__mkNilData(())
            )
        }
    )()
}
`
    //console.log(unoptimizedIR)

    const uplcProgram0 = compile(unoptimizedIR, {
        optimize: false,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
    const uplcProgram1 = compile(unoptimizedIR, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })

    const args = [
        makeUplcBool(true),
        makeUplcDataValue(
            decodeUplcData(
                "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028fa6ae00d87980d87a80ffffff809fd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa240a1401a00128bbc581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1546361706f476f762d65643930353863373663313601d87980d87a80ffd8799fd8799fd87a9f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ffd87a80ffa240a1401a00179c1a581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1546d696e744467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ff581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cc546d696e744467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ffd87a80ffa240a1401a0017bdc6581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1557370656e644467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ff581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cc557370656e644467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ffa240a1401a002f8c62581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1476368617274657201d87b9fd8799f9f557370656e644467742d656439303538633736633136d8799f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff80a09f546d696e744467742d656439303538633736633136d8799f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff809f546361706f476f762d656439303538633736633136d87a805f58407b22726576223a2231222c226164647248696e74223a5b22616464725f746573743171727030653432703366656c7a6c6379636a71686b7975657875706a65615840617970667261746c7a7034676436367036307276617138387a34376c347376667274677278306c72687472397778616475666a3535737572706a783070736634476a717771225d7dffffa080ffffd87a80ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028f2d54cbd87980d87a80ffffa140a1401a0007e737a240a14000581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca4476368617274657201546361706f476f762d65643930353863373663313601546d696e744467742d65643930353863373663313601557370656e644467742d6564393035386337366331360180a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff80a1d8799f581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312ccffd8799fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ffffa0d8799f5820e4eb1c812aad514d8a18dbe44ee4dac38eab540883f652ddd123fbec3dec1130ffffd8799f581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312ccffff"
            )
        )
    ]

    /**
     * @param {UplcProgramV2} program
     */
    const evalProgram = (program) => {
        const res = program.eval(args, { logOptions: makeBasicUplcLogger() })

        if (isRight(res.result)) {
            console.log("result: ", res.result.right.toString())
            return "result: " + res.result.right.toString()
        } else if (isLeft(res.result)) {
            console.log("error: ", res.result.left.error)
            return "error: " + res.result.left.error
        }
    }

    // the unoptimized is succeeding, the optimized is failing (this is BAD!)
    strictEqual(evalProgram(uplcProgram0), evalProgram(uplcProgram1))
})
