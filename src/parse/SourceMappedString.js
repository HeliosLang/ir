import { makeSource } from "@helios-lang/compiler-utils"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/compiler-utils").SourceMap} SourceMap
 */

/**
 * @typedef {{
 *   content: string | SourceMappedStringI[]
 *   site: Site | undefined
 *   flatten(): SourceMappedStringI[]
 *   includes(str: string): boolean
 *   join(sep: string): SourceMappedStringI
 *   replace(re: RegExp, newStr: string): SourceMappedStringI
 *   search(re: RegExp, callback: (match: string) => void): void
 *   toString(tab?: string, pretty?: boolean): string
 *   toStringWithSourceMap(tab?: string): [string, SourceMap]
 * }} SourceMappedStringI
 */

/**
 * @type {SourceMappedStringI}
 */
export class SourceMappedString {
    /**
     * @readonly
     * @type {string | SourceMappedStringI[]}
     */
    content

    /**
     * @private
     * @readonly
     * @type {string | SourceMappedStringI[]}
     */
    contentWithoutQuotedSections

    /**
     * @readonly
     * @type {Site | undefined}
     */
    site

    /**
     * @param {string | SourceMappedStringI[]} content
     * @param {Site | undefined} site
     */
    constructor(content, site = undefined) {
        this.content = content
        this.contentWithoutQuotedSections =
            typeof content == "string" ? removeQuotedSections(content) : content
        this.site = site
    }

    /**
     * Returns a list containing SourceMappedString instances that themselves only contain strings
     * @internal
     * @returns {SourceMappedStringI[]}
     */
    flatten() {
        if (typeof this.content == "string") {
            return [this]
        } else {
            /**
             * @type {SourceMappedStringI[]}
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
        if (typeof this.contentWithoutQuotedSections == "string") {
            return this.contentWithoutQuotedSections.includes(str)
        } else {
            return this.contentWithoutQuotedSections.some((ir) =>
                ir.includes(str)
            )
        }
    }

    /**
     * Intersperse nested IR content with a separator
     * @internal
     * @param {string} sep
     * @returns {SourceMappedStringI}
     */
    join(sep) {
        if (typeof this.content == "string") {
            return this
        } else {
            /**
             * @type {SourceMappedStringI[]}
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
     * TODO: how to handle quoted sections?
     * @param {RegExp} re
     * @param {string} newStr
     * @returns {SourceMappedStringI}
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
     * @param {RegExp} re
     * @param {(match: string) => void} callback
     */
    search(re, callback) {
        if (typeof this.contentWithoutQuotedSections == "string") {
            const ms = this.contentWithoutQuotedSections.match(re)

            if (ms) {
                for (let m of ms) {
                    callback(m)
                }
            }
        } else {
            this.contentWithoutQuotedSections.forEach((ir) =>
                ir.search(re, callback)
            )
        }
    }

    /**
     * @param {string} tab
     * @param {boolean} pretty
     * @returns {string}
     */
    toString(tab = "    ", pretty = false) {
        if (pretty) {
            const [src, _] = this.toStringWithSourceMap(tab)

            return makeSource(src).pretty()
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
 * @param {string | TemplateStringsArray | SourceMappedStringI[]} content
 * @param {...(Site | string | SourceMappedStringI | SourceMappedStringI[] | null | number)} args
 * @returns {SourceMappedStringI}
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
                "content" in site ||
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
         * @type {SourceMappedStringI[]}
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
            } else if ("content" in a) {
                if (s != "") {
                    items.push(new SourceMappedString(s))
                    s = ""
                }

                items.push(a)
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
         * @type {SourceMappedStringI[]}
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
                "content" in site ||
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

/**
 *
 * @param {string} content
 * @returns {string}
 */
function removeQuotedSections(content) {
    return content.replace(/"[^"\\]*(?:\\.[^"\\]*)*"/g, "")
}
