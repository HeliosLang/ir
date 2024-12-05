import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import { makeUplcDataValue, decodeUplcData } from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2} UplcProgramV2
 */

test("PBG::fund_policy::main", () => {
    const src = `(__DATUM_OR_REDEEMER, __REDEEMER_OR_CONTEXT) -> {
    main = (__MIXED, __CONTEXT) -> {
        (__helios__error) -> {
(__helios__common__enum_tag_equals) -> {
(__helios__mixedargs__spending____is) -> {
(__helios__common__enum_fields) -> {
(__helios__common__enum_field_0) -> {
(__helios__tx__inputs) -> {
(__helios__scriptcontext__data) -> {
(__helios__scriptcontext__tx) -> {
(__helios__common____eq) -> {
(__helios__txoutputid____eq) -> {
(__helios__txinput__output_id) -> {
(__helios__bool__and) -> {
(__helios__common__identity) -> {
(__helios__time__new) -> {
(__helios__int____mul) -> {
(__helios__duration____mul) -> {
(__helios__duration__WEEK) -> {
(__helios__bytearray____to_data) -> {
(__helios__pubkeyhash____to_data) -> {
(__helios__common__any) -> {
(__helios__common__enum_fields_after_0) -> {
(__helios__common__enum_fields_after_1) -> {
(__helios__common__enum_fields_after_2) -> {
(__helios__common__enum_fields_after_3) -> {
(__helios__common__enum_fields_after_4) -> {
(__helios__common__enum_fields_after_5) -> {
(__helios__common__enum_fields_after_6) -> {
(__helios__common__enum_fields_after_7) -> {
(__helios__common__enum_field_8) -> {
(__helios__tx__signatories) -> {
(__helios__tx__is_signed_by) -> {
(__helios__duration__DAY) -> {
(__helios__bool__trace_if_false) -> {
(__helios__string____eq) -> {
(__helios__int____eq) -> {
(__helios__common__map_get) -> {
(__helios__int__from_data) -> {
(__helios__bytearray__from_data) -> {
(__helios__pubkeyhash__from_data) -> {
(__helios__txoutputid__from_data) -> {
(__helios__common__enum_field_1) -> {
(__helios__value__get_safe) -> {
(__helios__txoutput__value) -> {
(__helios__txinput__output) -> {
(__helios__txinput__value) -> {
(__helios__address____eq) -> {
(__helios__txoutput__address) -> {
(__helios__txinput__address) -> {
(__helios__string____add) -> {
(__helios__int__to_hex) -> {
(__helios__bytearray__show) -> {
(__helios__mintingpolicyhash__show) -> {
(__helios__value__get) -> {
(__helios__assert) -> {
(__helios__txoutputdatum__inline) -> {
(__helios__common__enum_field_2) -> {
(__helios__txoutput__datum) -> {
(__helios__tx__outputs) -> {
(__helios__int____to_data) -> {
(__helios__time____to_data) -> {
(__helios__struct__from_data) -> {
(__helios__struct____to_data) -> {
(__helios__struct____eq) -> {
(__helios__int__is_valid_data) -> {
(__helios__time__is_valid_data) -> {
(__helios__duration____to_data) -> {
(__helios__ratio____to_data) -> {
(__helios__duration__is_valid_data) -> {
(__helios__common__test_list_data) -> {
(__helios__common__test_list_head_data) -> {
(__helios__common__test_list_empty) -> {
(__helios__ratio__is_valid_data) -> {
(__helios__txinput__from_data) -> {
(__helios__common__test_constr_data_2) -> {
(__helios__mintingpolicyhash__is_valid_data) -> {
(__helios__bytearray__is_valid_data_max_length) -> {
(__helios__assetclass__is_valid_data) -> {
(__helios__bool__is_valid_data) -> {
(__helios__string__from_data) -> {
(__helios__common__cip68_field_internal) -> {
(__helios__common__cip68_field) -> {
(__helios__txoutput__from_data) -> {
(__helios__assetclass____eq) -> {
(__helios__common__list_0) -> {
(__helios__common__list_1) -> {
(__helios__common__list_2) -> {
(__helios__mintingpolicyhash____to_data) -> {
(__helios__assetclass__new) -> {
(__helios__value__get_singleton_asset_class) -> {
(__helios__bool____not) -> {
(__helios__int____gt) -> {
(__helios__stakingvalidatorhash____to_data) -> {
(__helios__bytearray__is_valid_data_fixed_length) -> {
(__helios__pubkeyhash__is_valid_data) -> {
(__helios__stakingvalidatorhash__is_valid_data) -> {
(__helios__bytearray__is_valid_data) -> {
(__helios__real__is_valid_data) -> {
(__helios__real____to_data) -> {
(__helios__ratio__new_internal) -> {
(__helios__ratio__new) -> {
(__helios__int____leq) -> {
(__helios__common__length) -> {
(__helios__common__struct_fields_after_0) -> {
(__helios__common__struct_field_1) -> {
(__helios__real__from_data) -> {
(__helios__common__struct_field_0) -> {
(__helios__int____lt) -> {
(__helios__real____lt) -> {
(__helios__real____gt) -> {
(__helios__real____leq) -> {
(__helios__address__new) -> {
(__helios__validatorhash____to_data) -> {
(__helios__spendingcredential__new_validator) -> {
(__helios__option__NONE) -> {
(__helios__address__from_validator) -> {
(__helios__value__get_policy_safe) -> {
(__helios__common__enum_field_4) -> {
(__helios__tx__minted) -> {
(__helios__mintingpolicyhash__from_data) -> {
(__helios__value__get_singleton_policy) -> {
(__helios__scriptcontext__purpose) -> {
(__helios__scriptcontext__get_spending_purpose_output_id) -> {
(__helios__scriptcontext__get_current_input) -> {
(__helios__assetclass__mph) -> {
(__helios__mintingpolicyhash__from_script_hash) -> {
(__helios__string__encode_utf8) -> {
(__helios__common__starts_with) -> {
(__helios__bytearray__starts_with) -> {
(__helios__cip67__reference_token_label) -> {
(__helios__data__tag) -> {
(__helios__scriptcontext__get_current_minting_policy_hash) -> {
(__helios__validatorhash__from_data) -> {
(__helios__spendingcredential__validator__hash) -> {
(__helios__common__assert_constr_index) -> {
(__helios__spendingcredential__validator__cast) -> {
(__helios__address__credential) -> {
(__helios__scriptcontext__get_current_validator_hash) -> {
(__helios__stakingvalidatorhash__from_data) -> {
(__helios__scriptcontext__get_current_staking_validator_hash) -> {
(__helios__scriptcontext__get_current_script_hash) -> {
(__helios__scripts__benchmark_delegate) -> {
(__helios__scripts__config_validator) -> {
(__helios__scripts__governance_delegate) -> {
(__helios__scripts__metadata_validator) -> {
(__helios__scripts__oracle_delegate) -> {
(__helios__scripts__portfolio_validator) -> {
(__helios__scripts__price_validator) -> {
(__helios__scripts__supply_validator) -> {
(__helios__scripts__fund_policy) -> {
(__helios__scriptcontext__current_script) -> {
(__helios__script__assets_validator____is) -> {
(__helios__script__benchmark_delegate____is) -> {
(__helios__script__burn_order_validator____is) -> {
(__helios__script__config_validator____is) -> {
(__helios__script__fund_policy____is) -> {
(__helios__script__metadata_validator____is) -> {
(__helios__script__oracle_delegate____is) -> {
(__helios__script__portfolio_validator____is) -> {
(__helios__script__price_validator____is) -> {
(__helios__script__supply_validator____is) -> {
(__helios__script__reimbursement_validator____is) -> {
(__helios__script__voucher_validator____is) -> {
(__helios__script__mint_order_validator____is) -> {
(__module__TokenNames__metadata) -> {
(__module__TokenNames__assets_prefix) -> {
(__module__TokenNames__has_assets_prefix) -> {
(__module__TokenNames__config) -> {
(__module__TokenNames__portfolio) -> {
(__module__TokenNames__price) -> {
(__module__TokenNames__supply) -> {
(__module__Tokens__direct_policy) -> {
(__module__Tokens__indirect_policy) -> {
(__module__Tokens__policy) -> {
(__module__Tokens__metadata) -> {
(__module__Tokens__config) -> {
(__module__Tokens__portfolio) -> {
(__module__Tokens__price) -> {
(__module__Tokens__supply) -> {
(__module__Tokens__get_minted) -> {
(__helios__map[__helios__bytearray@__helios__int]__length) -> {
(__module__Addresses__metadata) -> {
(__module__Addresses__config) -> {
(__module__Addresses__portfolio) -> {
(__module__Addresses__price) -> {
(__module__Addresses__supply) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]__from_data) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]____to_data) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]__sigma) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]__c) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]____new) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_empty) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__tail) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__head) -> {
(__module__SuccessFeeModule__is_valid_internal) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data) -> {
(__module__SuccessFeeModule__SuccessFee[]__is_valid_data) -> {
(__module__SuccessFeeModule__SuccessFee[]____to_data) -> {
(__module__SuccessFeeModule__SuccessFee[]__c0) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__from_data) -> {
(__module__SuccessFeeModule__SuccessFee[]__steps) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]____to_data) -> {
(__module__SuccessFeeModule__SuccessFee[]____new) -> {
(__module__SuccessFeeModule__SuccessFee[]__MAX_SUCCESS_FEE_STEPS) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__length) -> {
(__module__SuccessFeeModule__SuccessFee[]__is_valid) -> {
(__module__ConfigModule__INITIAL_PRICE) -> {
(__module__ConfigModule__MintFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__MintFeeConfig[]____to_data) -> {
(__module__ConfigModule__MintFeeConfig[]____new) -> {
(__module__ConfigModule__BurnFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__BurnFeeConfig[]____to_data) -> {
(__module__ConfigModule__BurnFeeConfig[]____new) -> {
(__module__ConfigModule__ManagementFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__ManagementFeeConfig[]____to_data) -> {
(__module__ConfigModule__ManagementFeeConfig[]____new) -> {
(__module__ConfigModule__SuccessFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__SuccessFeeConfig[]____to_data) -> {
(__module__ConfigModule__SuccessFeeConfig[]____new) -> {
(__module__ConfigModule__FeesConfig[]__is_valid_data) -> {
(__module__ConfigModule__FeesConfig[]____to_data) -> {
(__module__ConfigModule__FeesConfig[]____new) -> {
(__module__ConfigModule__TokenConfig[]__is_valid_data) -> {
(__module__ConfigModule__TokenConfig[]____to_data) -> {
(__module__ConfigModule__TokenConfig[]____new) -> {
(__module__ConfigModule__GovernanceConfig[]__is_valid_data) -> {
(__module__ConfigModule__GovernanceConfig[]____to_data) -> {
(__module__ConfigModule__GovernanceConfig[]____new) -> {
(__module__ConfigModule__ConfigChangeProposal[]__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data) -> {
(__module__ConfigModule__ConfigState[]____to_data) -> {
(__module__ConfigModule__ConfigState[]__is_valid_data) -> {
(__module__ConfigModule__ConfigState[]__Idle__is_valid_data) -> {
(__module__ConfigModule__ConfigState[]__Idle____new) -> {
(__module__ConfigModule__ConfigState[]__Changing__is_valid_data) -> {
(__module__ConfigModule__Config[]__is_valid_data) -> {
(__module__ConfigModule__Config[]____eq) -> {
(__module__ConfigModule__Config[]__from_data) -> {
(__module__ConfigModule__Config[]____new) -> {
(__module__Tokens__contains[__helios__txinput]) -> {
(__module__Tokens__contains_only[__helios__txoutput]) -> {
(__module__Tokens__contains_only_config[__helios__txoutput]) -> {
(__helios__data__as_strictly[__module__ConfigModule__Config[]]) -> {
(__helios__list[__helios__txoutput]__find) -> {
(__module__ConfigModule__Config[]__find_output) -> {
(__module__MetadataModule__Metadata[]__from_data) -> {
(__module__MetadataModule__Metadata[]__name) -> {
(__module__MetadataModule__Metadata[]__description) -> {
(__module__MetadataModule__Metadata[]__decimals) -> {
(__module__MetadataModule__Metadata[]__ticker) -> {
(__module__MetadataModule__Metadata[]__url) -> {
(__module__MetadataModule__Metadata[]__logo) -> {
(__helios__data__as[__module__MetadataModule__Metadata[]]) -> {
(__module__Tokens__contains_only_metadata[__helios__txoutput]) -> {
(__module__MetadataModule__Metadata[]__find_output) -> {
(__helios__map[__helios__bytearray@__helios__int]__any_key) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__is_valid_data) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__is_valid_data) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__Exists__is_valid_data) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__is_valid_data) -> {
(__module__PortfolioModule__PortfolioReduction[]____to_data) -> {
(__module__PortfolioModule__PortfolioReduction[]__is_valid_data) -> {
(__module__PortfolioModule__PortfolioReduction[]__Idle__is_valid_data) -> {
(__module__PortfolioModule__PortfolioReduction[]__Idle____new) -> {
(__module__PortfolioModule__PortfolioReduction[]__Reducing__is_valid_data) -> {
(__module__PortfolioModule__Portfolio[]__is_valid_data) -> {
(__module__PortfolioModule__Portfolio[]____eq) -> {
(__module__PortfolioModule__Portfolio[]__from_data) -> {
(__module__PortfolioModule__Portfolio[]____new) -> {
(__module__Tokens__contains_portfolio[__helios__txinput]) -> {
(__module__Tokens__contains_only_portfolio[__helios__txoutput]) -> {
(__helios__data__as_strictly[__module__PortfolioModule__Portfolio[]]) -> {
(__module__PortfolioModule__Portfolio[]__find_output) -> {
(__helios__list[__helios__txinput]__any) -> {
(__module__PortfolioModule__witnessed_by_portfolio) -> {
(__module__PriceModule__Price[]__is_valid_data) -> {
(__module__PriceModule__Price[]____eq) -> {
(__module__PriceModule__Price[]__from_data) -> {
(__module__PriceModule__Price[]____new) -> {
(__module__Tokens__contains_only_price[__helios__txoutput]) -> {
(__helios__data__as_strictly[__module__PriceModule__Price[]]) -> {
(__module__PriceModule__Price[]__find_output) -> {
(__module__SupplyModule__SuccessFeeState[]__is_valid_data) -> {
(__module__SupplyModule__SuccessFeeState[]____to_data) -> {
(__module__SupplyModule__SuccessFeeState[]____new) -> {
(__module__SupplyModule__Supply[]__is_valid_data) -> {
(__module__SupplyModule__Supply[]____eq) -> {
(__module__SupplyModule__Supply[]__from_data) -> {
(__module__SupplyModule__Supply[]____new) -> {
(__module__Tokens__contains_only_supply[__helios__txoutput]) -> {
(__helios__data__as_strictly[__module__SupplyModule__Supply[]]) -> {
(__module__SupplyModule__Supply[]__find_output) -> {
(__module__SupplyModule__witnessed_by_supply) -> {
(__module__fund_policy__SEED_ID) -> {
(__module__fund_policy__INITIAL_AGENT) -> {
(__module__fund_policy__INITIAL_TICK) -> {
(__module__fund_policy__INITIAL_SUCCESS_FEE) -> {
(__helios__map[__helios__bytearray@__helios__int]__get) -> {
(__module__fund_policy__validate_minted_tokens) -> {
(__module__fund_policy__validate_initial_metadata) -> {
(__module__fund_policy__validate_initial_config) -> {
(__module__fund_policy__validate_initial_portfolio) -> {
(__module__fund_policy__validate_initial_price) -> {
(__module__fund_policy__validate_initial_supply) -> {
(__module__fund_policy__validate_initialization) -> {
(__module__fund_policy__validate_vault_spending) -> {
(__module__fund_policy__validate_mint_or_burn_asset_groups) -> {
(__module__fund_policy__validate_mint_or_burn_dvp_tokens_vouchers_or_reimbursement) -> {
(__module__fund_policy__main) -> {
        __core__ifThenElse(
            __module__fund_policy__main(__MIXED),
            () -> {()},
            () -> {__helios__error("validation returned false")}
        )()
}(
    /*__module__fund_policy__main*/
    (args) -> {
    (e0) ->
        {(
__core__ifThenElse(
				__helios__mixedargs__spending____is(e0),
				() -> {
					(__lhs_0) -> {
                    __module__fund_policy__validate_vault_spending()
                }
				}, () -> {
					(__lhs_0) -> {
                    __core__ifThenElse(__helios__list[__helios__txinput]__any(__helios__tx__inputs(__helios__scriptcontext__tx))((input) -> {
                        __helios__txoutputid____eq(__helios__txinput__output_id(input), __module__fund_policy__SEED_ID)
                    }), () -> {__module__fund_policy__validate_initialization()}, () -> {__core__ifThenElse(__helios__map[__helios__bytearray@__helios__int]__any_key(__module__Tokens__get_minted())(__module__TokenNames__has_assets_prefix), () -> {__module__fund_policy__validate_mint_or_burn_asset_groups()}, () -> {() -> {__module__fund_policy__validate_mint_or_burn_dvp_tokens_vouchers_or_reimbursement()}()})()})()
                }
				}
			)()
        )(e0)}(args)
}
)
}(
    /*__module__fund_policy__validate_mint_or_burn_dvp_tokens_vouchers_or_reimbursement*/
    () -> {
    __module__SupplyModule__witnessed_by_supply()
}
)
}(
    /*__module__fund_policy__validate_mint_or_burn_asset_groups*/
    () -> {
    __module__PortfolioModule__witnessed_by_portfolio()
}
)
}(
    /*__module__fund_policy__validate_vault_spending*/
    () -> {
    __module__SupplyModule__witnessed_by_supply()
}
)
}(
    /*__module__fund_policy__validate_initialization*/
    () -> {
    __helios__bool__and(
        () -> {__helios__bool__and(
            () -> {__helios__bool__and(
                () -> {__helios__bool__and(
                    () -> {__helios__bool__and(
                        () -> {__module__fund_policy__validate_minted_tokens()},
                        () -> {__module__fund_policy__validate_initial_metadata()}
                    )},
                    () -> {__module__fund_policy__validate_initial_config()}
                )},
                () -> {__module__fund_policy__validate_initial_portfolio()}
            )},
            () -> {__module__fund_policy__validate_initial_price()}
        )},
        () -> {__module__fund_policy__validate_initial_supply()}
    )
}
)
}(
    /*__module__fund_policy__validate_initial_supply*/
    () -> {
    (supply) -> {
        __module__SupplyModule__Supply[]____eq(supply, __module__SupplyModule__Supply[]____new(__module__fund_policy__INITIAL_TICK, 0, 0, 0, 0, __helios__time__new(0), __module__SupplyModule__SuccessFeeState[]____new(0, __helios__time__new(0), __helios__duration____mul(__helios__duration__WEEK, 2), __module__ConfigModule__INITIAL_PRICE)))
    }(__module__SupplyModule__Supply[]__find_output())
}
)
}(
    /*__module__fund_policy__validate_initial_price*/
    () -> {
    (price) -> {
        __module__PriceModule__Price[]____eq(price, __module__PriceModule__Price[]____new(__module__ConfigModule__INITIAL_PRICE, __helios__time__new(0)))
    }(__module__PriceModule__Price[]__find_output())
}
)
}(
    /*__module__fund_policy__validate_initial_portfolio*/
    () -> {
    (portfolio) -> {
        __module__PortfolioModule__Portfolio[]____eq(portfolio, __module__PortfolioModule__Portfolio[]____new(0, __module__PortfolioModule__PortfolioReduction[]__Idle____new()))
    }(__module__PortfolioModule__Portfolio[]__find_output())
}
)
}(
    /*__module__fund_policy__validate_initial_config*/
    () -> {
    (config) -> {
        __helios__bool__and(
            () -> {__helios__bool__and(
                () -> {__helios__tx__is_signed_by(__helios__scriptcontext__tx)(__module__fund_policy__INITIAL_AGENT)},
                () -> {__module__SuccessFeeModule__SuccessFee[]__is_valid(__module__fund_policy__INITIAL_SUCCESS_FEE)()}
            )},
            () -> {__module__ConfigModule__Config[]____eq(config, __module__ConfigModule__Config[]____new(__module__fund_policy__INITIAL_AGENT, __module__ConfigModule__FeesConfig[]____new(__module__ConfigModule__MintFeeConfig[]____new(5000, 20000), __module__ConfigModule__BurnFeeConfig[]____new(5000, 20000), __module__ConfigModule__ManagementFeeConfig[]____new(110, __helios__duration__DAY), __module__ConfigModule__SuccessFeeConfig[]____new(__module__fund_policy__INITIAL_SUCCESS_FEE, __helios__scripts__benchmark_delegate)), __module__ConfigModule__TokenConfig[]____new(100000000000, __helios__duration__DAY), __helios__scripts__oracle_delegate, __module__ConfigModule__GovernanceConfig[]____new(__helios__duration____mul(__helios__duration__WEEK, 2), __helios__scripts__governance_delegate), __module__ConfigModule__ConfigState[]__Idle____new()))}
        )
    }(__module__ConfigModule__Config[]__find_output())
}
)
}(
    /*__module__fund_policy__validate_initial_metadata*/
    () -> {
    (metadata) -> {
        __helios__bool__and(
            () -> {__helios__bool__and(
                () -> {__helios__bool__and(
                    () -> {__helios__bool__and(
                        () -> {__helios__bool__and(
                            () -> {__helios__bool__trace_if_false(__helios__string____eq(__module__MetadataModule__Metadata[]__name(metadata), "PBG Token"))("wrong metadata name")},
                            () -> {__helios__bool__trace_if_false(__helios__string____eq(__module__MetadataModule__Metadata[]__description(metadata), "The first DVP"))("wrong metadata description")}
                        )},
                        () -> {__helios__bool__trace_if_false(__helios__string____eq(__module__MetadataModule__Metadata[]__ticker(metadata), "PBG"))("wrong metadata ticker")}
                    )},
                    () -> {__helios__bool__trace_if_false(__helios__string____eq(__module__MetadataModule__Metadata[]__url(metadata), "https://pbg.io"))("wrong metadata url")}
                )},
                () -> {__helios__bool__trace_if_false(__helios__int____eq(__module__MetadataModule__Metadata[]__decimals(metadata), 6))("wrong metadata decimals")}
            )},
            () -> {__helios__bool__trace_if_false(__helios__string____eq(__module__MetadataModule__Metadata[]__logo(metadata), "https://token.pbg.io/logo.png"))("wrong metadata logo uri")}
        )
    }(__module__MetadataModule__Metadata[]__find_output())
}
)
}(
    /*__module__fund_policy__validate_minted_tokens*/
    () -> {
    (tokens) -> {
        __helios__bool__and(
            () -> {__helios__bool__and(
                () -> {__helios__bool__and(
                    () -> {__helios__bool__and(
                        () -> {__helios__bool__and(
                            () -> {__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__length(tokens), 5)},
                            () -> {__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__get(tokens)(__module__TokenNames__metadata), 1)}
                        )},
                        () -> {__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__get(tokens)(__module__TokenNames__config), 1)}
                    )},
                    () -> {__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__get(tokens)(__module__TokenNames__portfolio), 1)}
                )},
                () -> {__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__get(tokens)(__module__TokenNames__price), 1)}
            )},
            () -> {__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__get(tokens)(__module__TokenNames__supply), 1)}
        )
    }(__module__Tokens__get_minted())
}
)
}(
    /*__helios__map[__helios__bytearray@__helios__int]__get*/
    (self) -> {
        (key) -> {
            __helios__common__map_get(
                self, 
                __helios__bytearray____to_data(key), 
                (x) -> {__helios__int__from_data(x)}, 
                () -> {__helios__error("key not found")}
            )
        }
    }
)
}(
    /*__module__fund_policy__INITIAL_SUCCESS_FEE*/
    __module__SuccessFeeModule__SuccessFee[]____new(0, __core__mkCons(__module__SuccessFeeModule__SuccessFeeStep[]____to_data(__module__SuccessFeeModule__SuccessFeeStep[]____new(1050000, 300000)), __core__mkNilData(())))
)
}(
    /*__module__fund_policy__INITIAL_TICK*/
    0
)
}(
    /*__module__fund_policy__INITIAL_AGENT*/
    __helios__pubkeyhash__from_data(##581c00000000000000000000000000000000000000000000000000000000)
)
}(
    /*__module__fund_policy__SEED_ID*/
    __helios__txoutputid__from_data(##d8799fd8799f5820ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff)
)
}(
    /*__module__SupplyModule__witnessed_by_supply*/
    () -> {
    (e0) ->
        {(
__core__ifThenElse(
				__helios__script__assets_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                    __helios__list[__helios__txinput]__any(__helios__tx__inputs(__helios__scriptcontext__tx))((input) -> {
                        __helios__int____eq(__helios__value__get_safe(__helios__txinput__value(input))(__module__Tokens__supply), 1)
                    })
                }
				}, () -> {
					(_) -> {
                    __helios__list[__helios__txinput]__any(__helios__tx__inputs(__helios__scriptcontext__tx))((input) -> {
                        __helios__bool__and(
                            () -> {__helios__address____eq(__helios__txinput__address(input), __module__Addresses__supply)},
                            () -> {__helios__int____eq(__helios__value__get(__helios__txinput__value(input))(__module__Tokens__supply), 1)}
                        )
                    })
                }
				}
			)()
        )(e0)}(__helios__scriptcontext__current_script)
}
)
}(
    /*__module__SupplyModule__Supply[]__find_output*/
    () -> {
    (output) -> {
        __core__chooseUnit(__helios__assert(__module__Tokens__contains_only_supply[__helios__txoutput](output), "doesn't contain only the supply token"), __helios__data__as_strictly[__module__SupplyModule__Supply[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output))))
    }(__helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
        __helios__address____eq(__helios__txoutput__address(output), __module__Addresses__supply)
    }))
}
)
}(
    /*__helios__data__as_strictly[__module__SupplyModule__Supply[]]*/
    (data) -> {
        __core__ifThenElse(
            __module__SupplyModule__Supply[]__is_valid_data(data),
            () -> {
                __module__SupplyModule__Supply[]__from_data(data)
            },
            () -> {
                __helios__error("invalid data structure")
            }
        )()
    }
)
}(
    /*__module__Tokens__contains_only_supply[__helios__txoutput]*/
    (v) -> {
    __module__Tokens__contains_only[__helios__txoutput](v, __module__Tokens__supply)
}
)
}(
    /*__module__SupplyModule__Supply[]____new*/
    (tick, n_tokens, n_vouchers, last_voucher_id, n_lovelace, management_fee_timestamp, success_fee) -> {__core__mkCons(__helios__int____to_data(tick), __core__mkCons(__helios__int____to_data(n_tokens), __core__mkCons(__helios__int____to_data(n_vouchers), __core__mkCons(__helios__int____to_data(last_voucher_id), __core__mkCons(__helios__int____to_data(n_lovelace), __core__mkCons(__helios__time____to_data(management_fee_timestamp), __core__mkCons(__module__SupplyModule__SuccessFeeState[]____to_data(success_fee), __core__mkNilData(()))))))))}
)
}(
    /*__module__SupplyModule__Supply[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__SupplyModule__Supply[]____eq*/
    __helios__struct____eq
)
}(
    /*__module__SupplyModule__Supply[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__time__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__SupplyModule__SuccessFeeState[]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__SupplyModule__SuccessFeeState[]____new*/
    (period_id, start_time, period, start_price) -> {__core__mkCons(__helios__int____to_data(period_id), __core__mkCons(__helios__time____to_data(start_time), __core__mkCons(__helios__duration____to_data(period), __core__mkCons(__helios__ratio____to_data(start_price), __core__mkNilData(())))))}
)
}(
    /*__module__SupplyModule__SuccessFeeState[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__SupplyModule__SuccessFeeState[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__time__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__ratio__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__PriceModule__Price[]__find_output*/
    () -> {
    (output) -> {
        __core__chooseUnit(__helios__assert(__module__Tokens__contains_only_price[__helios__txoutput](output), "doesn't contain only the price token"), __helios__data__as_strictly[__module__PriceModule__Price[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output))))
    }(__helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
        __helios__address____eq(__helios__txoutput__address(output), __module__Addresses__price)
    }))
}
)
}(
    /*__helios__data__as_strictly[__module__PriceModule__Price[]]*/
    (data) -> {
        __core__ifThenElse(
            __module__PriceModule__Price[]__is_valid_data(data),
            () -> {
                __module__PriceModule__Price[]__from_data(data)
            },
            () -> {
                __helios__error("invalid data structure")
            }
        )()
    }
)
}(
    /*__module__Tokens__contains_only_price[__helios__txoutput]*/
    (v) -> {
    __module__Tokens__contains_only[__helios__txoutput](v, __module__Tokens__price)
}
)
}(
    /*__module__PriceModule__Price[]____new*/
    (value, timestamp) -> {__core__mkCons(__helios__ratio____to_data(value), __core__mkCons(__helios__time____to_data(timestamp), __core__mkNilData(())))}
)
}(
    /*__module__PriceModule__Price[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__PriceModule__Price[]____eq*/
    __helios__struct____eq
)
}(
    /*__module__PriceModule__Price[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__ratio__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__time__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__PortfolioModule__witnessed_by_portfolio*/
    () -> {
    (e0) ->
        {(
__core__ifThenElse(
				__helios__script__assets_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                    __helios__list[__helios__txinput]__any(__helios__tx__inputs(__helios__scriptcontext__tx))(__module__Tokens__contains_portfolio[__helios__txinput])
                }
				}, () -> {
					(_) -> {
                    __helios__list[__helios__txinput]__any(__helios__tx__inputs(__helios__scriptcontext__tx))((input) -> {
                        __helios__bool__and(
                            () -> {__helios__address____eq(__helios__txinput__address(input), __module__Addresses__portfolio)},
                            () -> {__helios__int____eq(__helios__value__get(__helios__txinput__value(input))(__module__Tokens__portfolio), 1)}
                        )
                    })
                }
				}
			)()
        )(e0)}(__helios__scriptcontext__current_script)
}
)
}(
    /*__helios__list[__helios__txinput]__any*/
    (self) -> {
        (fn) -> {
            __helios__common__any(
                self, 
                (item) -> {
                    fn(__helios__txinput__from_data(item))
                }
            )
        }
    }
)
}(
    /*__module__PortfolioModule__Portfolio[]__find_output*/
    () -> {
    (output) -> {
        __core__chooseUnit(__helios__assert(__module__Tokens__contains_only_portfolio[__helios__txoutput](output), "doesn't contain only the portfolio token"), __helios__data__as_strictly[__module__PortfolioModule__Portfolio[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output))))
    }(__helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
        __helios__address____eq(__helios__txoutput__address(output), __module__Addresses__portfolio)
    }))
}
)
}(
    /*__helios__data__as_strictly[__module__PortfolioModule__Portfolio[]]*/
    (data) -> {
        __core__ifThenElse(
            __module__PortfolioModule__Portfolio[]__is_valid_data(data),
            () -> {
                __module__PortfolioModule__Portfolio[]__from_data(data)
            },
            () -> {
                __helios__error("invalid data structure")
            }
        )()
    }
)
}(
    /*__module__Tokens__contains_only_portfolio[__helios__txoutput]*/
    (v) -> {
    __module__Tokens__contains_only[__helios__txoutput](v, __module__Tokens__portfolio)
}
)
}(
    /*__module__Tokens__contains_portfolio[__helios__txinput]*/
    (v) -> {
    __module__Tokens__contains[__helios__txinput](v, __module__Tokens__portfolio)
}
)
}(
    /*__module__PortfolioModule__Portfolio[]____new*/
    (n_groups, reduction) -> {__core__mkCons(__helios__int____to_data(n_groups), __core__mkCons(__module__PortfolioModule__PortfolioReduction[]____to_data(reduction), __core__mkNilData(())))}
)
}(
    /*__module__PortfolioModule__Portfolio[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__PortfolioModule__Portfolio[]____eq*/
    __helios__struct____eq
)
}(
    /*__module__PortfolioModule__Portfolio[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__PortfolioModule__PortfolioReduction[]__is_valid_data(__module__PortfolioModule__PortfolioReduction[]__Idle__is_valid_data, __module__PortfolioModule__PortfolioReduction[]__Reducing__is_valid_data)(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__PortfolioModule__PortfolioReduction[]__Reducing__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 1),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__PortfolioModule__PortfolioReductionMode[]__is_valid_data(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__is_valid_data, __module__PortfolioModule__PortfolioReductionMode[]__Exists__is_valid_data, __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__is_valid_data)(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__PortfolioModule__PortfolioReduction[]__Idle____new*/
    () -> {__core__constrData(0, __core__mkNilData(()))}
)
}(
    /*__module__PortfolioModule__PortfolioReduction[]__Idle__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 0),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__PortfolioModule__PortfolioReduction[]__is_valid_data*/
    (__module__PortfolioModule__PortfolioReduction[]__Idle__is_valid_data, __module__PortfolioModule__PortfolioReduction[]__Reducing__is_valid_data) -> {(data) -> {
			__core__ifThenElse(
				__module__PortfolioModule__PortfolioReduction[]__Reducing__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__PortfolioModule__PortfolioReduction[]__Idle__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					false
				}
			)()
				}
			)()
		}}
)
}(
    /*__module__PortfolioModule__PortfolioReduction[]____to_data*/
    __helios__common__identity
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 2),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__assetclass__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__Exists__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 1),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__assetclass__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__bool__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 0),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__time__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__is_valid_data*/
    (__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__is_valid_data, __module__PortfolioModule__PortfolioReductionMode[]__Exists__is_valid_data, __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__is_valid_data) -> {(data) -> {
			__core__ifThenElse(
				__module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__PortfolioModule__PortfolioReductionMode[]__Exists__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					false
				}
			)()
				}
			)()
				}
			)()
		}}
)
}(
    /*__helios__map[__helios__bytearray@__helios__int]__any_key*/
    (self) -> {
        (fn) -> {
            fn = (pair) -> {
                fn(__helios__bytearray__from_data(__core__fstPair(pair)))
            };
            __helios__common__any(self, fn)
        }
    }
)
}(
    /*__module__MetadataModule__Metadata[]__find_output*/
    () -> {
    (output) -> {
        __core__chooseUnit(__helios__assert(__module__Tokens__contains_only_metadata[__helios__txoutput](output), "doesn't contain only the metadata token"), __helios__data__as[__module__MetadataModule__Metadata[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output))))
    }(__helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
        __helios__address____eq(__helios__txoutput__address(output), __module__Addresses__metadata)
    }))
}
)
}(
    /*__module__Tokens__contains_only_metadata[__helios__txoutput]*/
    (v) -> {
    __module__Tokens__contains_only[__helios__txoutput](v, __module__Tokens__metadata)
}
)
}(
    /*__helios__data__as[__module__MetadataModule__Metadata[]]*/
    (data) -> {
        __module__MetadataModule__Metadata[]__from_data(data)
    }
)
}(
    /*__module__MetadataModule__Metadata[]__logo*/
    (self) -> {__helios__string__from_data(__helios__common__cip68_field(self, #6c6f676f))}
)
}(
    /*__module__MetadataModule__Metadata[]__url*/
    (self) -> {__helios__string__from_data(__helios__common__cip68_field(self, #75726c))}
)
}(
    /*__module__MetadataModule__Metadata[]__ticker*/
    (self) -> {__helios__string__from_data(__helios__common__cip68_field(self, #7469636b6572))}
)
}(
    /*__module__MetadataModule__Metadata[]__decimals*/
    (self) -> {__helios__int__from_data(__helios__common__cip68_field(self, #646563696d616c73))}
)
}(
    /*__module__MetadataModule__Metadata[]__description*/
    (self) -> {__helios__string__from_data(__helios__common__cip68_field(self, #6465736372697074696f6e))}
)
}(
    /*__module__MetadataModule__Metadata[]__name*/
    (self) -> {__helios__string__from_data(__helios__common__cip68_field(self, #6e616d65))}
)
}(
    /*__module__MetadataModule__Metadata[]__from_data*/
    __helios__common__identity
)
}(
    /*__module__ConfigModule__Config[]__find_output*/
    () -> {
    (output) -> {
        __core__chooseUnit(__helios__assert(__module__Tokens__contains_only_config[__helios__txoutput](output), "doesn't contain only the config token"), __helios__data__as_strictly[__module__ConfigModule__Config[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output))))
    }(__helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
        __helios__address____eq(__helios__txoutput__address(output), __module__Addresses__config)
    }))
}
)
}(
    /*__helios__list[__helios__txoutput]__find*/
    (self) -> {
        (fn) -> {
            recurse = (recurse, lst) -> {
                __core__chooseList(
                    lst, 
                    () -> {__helios__error("not found")}, 
                    () -> {
                        item = __helios__txoutput__from_data(__core__headList__safe(lst));
                        __core__ifThenElse(
                            fn(item), 
                            () -> {item}, 
                            () -> {recurse(recurse, __core__tailList__safe(lst))}
                        )()
                    }
                )()
            };
            recurse(recurse, self)
        }
    }
)
}(
    /*__helios__data__as_strictly[__module__ConfigModule__Config[]]*/
    (data) -> {
        __core__ifThenElse(
            __module__ConfigModule__Config[]__is_valid_data(data),
            () -> {
                __module__ConfigModule__Config[]__from_data(data)
            },
            () -> {
                __helios__error("invalid data structure")
            }
        )()
    }
)
}(
    /*__module__Tokens__contains_only_config[__helios__txoutput]*/
    (v) -> {
    __module__Tokens__contains_only[__helios__txoutput](v, __module__Tokens__config)
}
)
}(
    /*__module__Tokens__contains_only[__helios__txoutput]*/
    (v, asset_class) -> {
    __helios__assetclass____eq(__helios__value__get_singleton_asset_class(__helios__txoutput__value(v))(), asset_class)
}
)
}(
    /*__module__Tokens__contains[__helios__txinput]*/
    (v, asset_class) -> {
    __helios__int____gt(__helios__value__get_safe(__helios__txinput__value(v))(asset_class), 0)
}
)
}(
    /*__module__ConfigModule__Config[]____new*/
    (agent, fees, token, oracle, governance, state) -> {__core__mkCons(__helios__pubkeyhash____to_data(agent), __core__mkCons(__module__ConfigModule__FeesConfig[]____to_data(fees), __core__mkCons(__module__ConfigModule__TokenConfig[]____to_data(token), __core__mkCons(__helios__stakingvalidatorhash____to_data(oracle), __core__mkCons(__module__ConfigModule__GovernanceConfig[]____to_data(governance), __core__mkCons(__module__ConfigModule__ConfigState[]____to_data(state), __core__mkNilData(())))))))}
)
}(
    /*__module__ConfigModule__Config[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__ConfigModule__Config[]____eq*/
    __helios__struct____eq
)
}(
    /*__module__ConfigModule__Config[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__pubkeyhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__FeesConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__TokenConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__GovernanceConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__ConfigState[]__is_valid_data(__module__ConfigModule__ConfigState[]__Idle__is_valid_data, __module__ConfigModule__ConfigState[]__Changing__is_valid_data)(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__ConfigState[]__Changing__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 1),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__time__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__ConfigChangeProposal[]__is_valid_data(__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data)(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigState[]__Idle____new*/
    () -> {__core__constrData(0, __core__mkNilData(()))}
)
}(
    /*__module__ConfigModule__ConfigState[]__Idle__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 0),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigState[]__is_valid_data*/
    (__module__ConfigModule__ConfigState[]__Idle__is_valid_data, __module__ConfigModule__ConfigState[]__Changing__is_valid_data) -> {(data) -> {
			__core__ifThenElse(
				__module__ConfigModule__ConfigState[]__Changing__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigState[]__Idle__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					false
				}
			)()
				}
			)()
		}}
)
}(
    /*__module__ConfigModule__ConfigState[]____to_data*/
    __helios__common__identity
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 11),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__bytearray__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 10),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 9),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 8),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 7),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 6),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 5),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 4),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__pubkeyhash__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 3),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 2),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__SuccessFeeModule__SuccessFee[]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 1),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__assetclass__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 0),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__assetclass__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__is_valid_data*/
    (__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data) -> {(data) -> {
			__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					false
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
		}}
)
}(
    /*__module__ConfigModule__GovernanceConfig[]____new*/
    (update_delay, delegate) -> {__core__mkCons(__helios__duration____to_data(update_delay), __core__mkCons(__helios__stakingvalidatorhash____to_data(delegate), __core__mkNilData(())))}
)
}(
    /*__module__ConfigModule__GovernanceConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__GovernanceConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__TokenConfig[]____new*/
    (max_supply, max_price_age) -> {__core__mkCons(__helios__int____to_data(max_supply), __core__mkCons(__helios__duration____to_data(max_price_age), __core__mkNilData(())))}
)
}(
    /*__module__ConfigModule__TokenConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__TokenConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__FeesConfig[]____new*/
    (mint_fee, burn_fee, management_fee, success_fee) -> {__core__mkCons(__module__ConfigModule__MintFeeConfig[]____to_data(mint_fee), __core__mkCons(__module__ConfigModule__BurnFeeConfig[]____to_data(burn_fee), __core__mkCons(__module__ConfigModule__ManagementFeeConfig[]____to_data(management_fee), __core__mkCons(__module__ConfigModule__SuccessFeeConfig[]____to_data(success_fee), __core__mkNilData(())))))}
)
}(
    /*__module__ConfigModule__FeesConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__FeesConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__MintFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__BurnFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__ManagementFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__SuccessFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__SuccessFeeConfig[]____new*/
    (fee, benchmark) -> {__core__mkCons(__module__SuccessFeeModule__SuccessFee[]____to_data(fee), __core__mkCons(__helios__stakingvalidatorhash____to_data(benchmark), __core__mkNilData(())))}
)
}(
    /*__module__ConfigModule__SuccessFeeConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__SuccessFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__SuccessFeeModule__SuccessFee[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__ManagementFeeConfig[]____new*/
    (relative, period) -> {__core__mkCons(__helios__real____to_data(relative), __core__mkCons(__helios__duration____to_data(period), __core__mkNilData(())))}
)
}(
    /*__module__ConfigModule__ManagementFeeConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__ManagementFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__BurnFeeConfig[]____new*/
    (relative, minimum) -> {__core__mkCons(__helios__real____to_data(relative), __core__mkCons(__helios__int____to_data(minimum), __core__mkNilData(())))}
)
}(
    /*__module__ConfigModule__BurnFeeConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__BurnFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__MintFeeConfig[]____new*/
    (relative, minimum) -> {__core__mkCons(__helios__real____to_data(relative), __core__mkCons(__helios__int____to_data(minimum), __core__mkNilData(())))}
)
}(
    /*__module__ConfigModule__MintFeeConfig[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__MintFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__INITIAL_PRICE*/
    __helios__ratio__new(100, 1)
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]__is_valid*/
    (self) -> {
    () -> {
        __helios__bool__and(
        () -> {__helios__int____leq(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__length(__module__SuccessFeeModule__SuccessFee[]__steps(self)), __module__SuccessFeeModule__SuccessFee[]__MAX_SUCCESS_FEE_STEPS)},
        () -> {__module__SuccessFeeModule__is_valid_internal(__module__SuccessFeeModule__is_valid_internal)(1000000, __module__SuccessFeeModule__SuccessFee[]__c0(self), __module__SuccessFeeModule__SuccessFee[]__steps(self))}
    )
    }
}
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__length*/
    __helios__common__length
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]__MAX_SUCCESS_FEE_STEPS*/
    10
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]____new*/
    (c0, steps) -> {__core__mkCons(__helios__real____to_data(c0), __core__mkCons(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]____to_data(steps), __core__mkNilData(())))}
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]____to_data*/
    __core__listData
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]__steps*/
    (self) -> {
							__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__from_data(__helios__common__struct_field_1(self))
						}
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__from_data*/
    (data) -> {
        lst = __core__unListData(data);
        _ = __core__ifThenElse(
            __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal(lst),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid list data", ())
            }
        )();
        lst
    }
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]__c0*/
    (self) -> {
							__helios__real__from_data(__helios__common__struct_field_0(self))
						}
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data*/
    (data) -> {
        __core__chooseData(
            data,
            () -> {false},
            () -> {false},
            () -> {
                __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal(__core__unListData__safe(data))
            },
            () -> {false},
            () -> {false}
        )()
    }
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal*/
    (lst) -> {
        recurse = (recurse, lst) -> {
            __core__chooseList(
                lst,
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data(__core__headList__safe(lst)),
                        () -> {
                            recurse(recurse, __core__tailList__safe(lst))
                        },
                        () -> {
                            false
                        }
                    )()
                }
            )()
        };
        recurse(recurse, lst)
    }
)
}(
    /*__module__SuccessFeeModule__is_valid_internal*/
    (__module__SuccessFeeModule__is_valid_internal) -> {(sigma, c, next) -> {
    __core__ifThenElse(__helios__real____lt(sigma, 1000000), () -> {false}, () -> {__core__ifThenElse(__helios__real____gt(sigma, 10000000), () -> {false}, () -> {__core__ifThenElse(__helios__real____lt(c, 0), () -> {false}, () -> {__core__ifThenElse(__helios__real____gt(c, 1000000), () -> {false}, () -> {__core__ifThenElse(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_empty(next)(), () -> {true}, () -> {() -> {(__lhs_0) -> {
        (sigma_next) -> {
            (c_next) -> {
            __core__ifThenElse(__helios__real____leq(sigma_next, sigma), () -> {false}, () -> {() -> {__module__SuccessFeeModule__is_valid_internal(__module__SuccessFeeModule__is_valid_internal)(sigma_next, c_next, __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__tail(next))}()})()
        }(__module__SuccessFeeModule__SuccessFeeStep[]__c(__lhs_0))
        }(__module__SuccessFeeModule__SuccessFeeStep[]__sigma(__lhs_0))
    }(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__head(next))}()})()})()})()})()})()
}}
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__head*/
    (self) -> {
        __module__SuccessFeeModule__SuccessFeeStep[]__from_data(__core__headList(self))
    }
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__tail*/
    __core__tailList
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_empty*/
    (self) -> {
        () -> {
            __core__nullList(self)
        }
    }
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]____new*/
    (sigma, c) -> {__core__mkCons(__helios__real____to_data(sigma), __core__mkCons(__helios__real____to_data(c), __core__mkNilData(())))}
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]__c*/
    (self) -> {
							__helios__real__from_data(__helios__common__struct_field_1(self))
						}
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]__sigma*/
    (self) -> {
							__helios__real__from_data(__helios__common__struct_field_0(self))
						}
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__Addresses__supply*/
    __helios__address__from_validator(__helios__scripts__supply_validator)
)
}(
    /*__module__Addresses__price*/
    __helios__address__from_validator(__helios__scripts__price_validator)
)
}(
    /*__module__Addresses__portfolio*/
    __helios__address__from_validator(__helios__scripts__portfolio_validator)
)
}(
    /*__module__Addresses__config*/
    __helios__address__from_validator(__helios__scripts__config_validator)
)
}(
    /*__module__Addresses__metadata*/
    __helios__address__from_validator(__helios__scripts__metadata_validator)
)
}(
    /*__helios__map[__helios__bytearray@__helios__int]__length*/
    (self) -> {
        __helios__common__length(self)
    }
)
}(
    /*__module__Tokens__get_minted*/
    () -> {
    __helios__value__get_policy_safe(__helios__tx__minted(__helios__scriptcontext__tx))(__module__Tokens__policy)
}
)
}(
    /*__module__Tokens__supply*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__supply)
)
}(
    /*__module__Tokens__price*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__price)
)
}(
    /*__module__Tokens__portfolio*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__portfolio)
)
}(
    /*__module__Tokens__config*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__config)
)
}(
    /*__module__Tokens__metadata*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__metadata)
)
}(
    /*__module__Tokens__policy*/
    (e0) ->
    {(
__core__ifThenElse(
				__helios__script__fund_policy____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__mint_order_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__burn_order_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__supply_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__assets_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__portfolio_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__price_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__reimbursement_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                (input) -> {
                    __helios__value__get_singleton_policy(__helios__txinput__value(input))()
                }(__helios__scriptcontext__get_current_input())
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__voucher_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__config_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__metadata_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__oracle_delegate____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__benchmark_delegate____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
				}
			)()
    )(e0)}(__helios__scriptcontext__current_script)
)
}(
    /*__module__Tokens__indirect_policy*/
    () -> {
    (input) -> {
        __helios__assetclass__mph(__helios__value__get_singleton_asset_class(__helios__txinput__value(input))())
    }(__helios__scriptcontext__get_current_input())
}
)
}(
    /*__module__Tokens__direct_policy*/
    __helios__mintingpolicyhash__from_script_hash(__helios__scripts__fund_policy)
)
}(
    /*__module__TokenNames__supply*/
    __helios__string__encode_utf8("supply")()
)
}(
    /*__module__TokenNames__price*/
    __helios__string__encode_utf8("price")()
)
}(
    /*__module__TokenNames__portfolio*/
    __helios__string__encode_utf8("portfolio")()
)
}(
    /*__module__TokenNames__config*/
    __helios__string__encode_utf8("config")()
)
}(
    /*__module__TokenNames__has_assets_prefix*/
    (token_name) -> {
    __helios__bytearray__starts_with(token_name)(__module__TokenNames__assets_prefix)
}
)
}(
    /*__module__TokenNames__assets_prefix*/
    __helios__string__encode_utf8("assets ")()
)
}(
    /*__module__TokenNames__metadata*/
    __helios__cip67__reference_token_label
)
}(
    /*__helios__script__mint_order_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__voucher_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__reimbursement_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__supply_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__price_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__portfolio_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__oracle_delegate____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__metadata_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__fund_policy____is*/
    (_) -> {
               true
           }
)
}(
    /*__helios__script__config_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__burn_order_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__benchmark_delegate____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__script__assets_validator____is*/
    (_) -> {
               false
           }
)
}(
    /*__helios__scriptcontext__current_script*/
    __core__constrData(
                4,
                __core__mkNilData(())
            )
)
}(
    /*__helios__scripts__fund_policy*/
    __helios__scriptcontext__get_current_script_hash()
)
}(
    /*__helios__scripts__supply_validator*/
    #133a4e7c8cf52a01e284b1aab5d4fa1060ed953dad931759e053d39a
)
}(
    /*__helios__scripts__price_validator*/
    #4f05a0f2e7469907990e900b432109e07cff1840de1fd8a5da72d3fc
)
}(
    /*__helios__scripts__portfolio_validator*/
    #ce15d5a612f4721467357c311b4ea2500c476097499bb480be8cb598
)
}(
    /*__helios__scripts__oracle_delegate*/
    #03d9bf874aa50cb845f4dcf011a223ed4b1ccd51b485990baa79d676
)
}(
    /*__helios__scripts__metadata_validator*/
    #eaeaf831b30265c8e5a16cc219937c473d69981ec982bfa41cc9f23f
)
}(
    /*__helios__scripts__governance_delegate*/
    #03d9bf874aa50cb845f4dcf011a223ed4b1ccd51b485990baa79d676
)
}(
    /*__helios__scripts__config_validator*/
    #d40e8fcc630ba8a4f6455d383bf88748a3d9e8c3b4acc8a99d292c63
)
}(
    /*__helios__scripts__benchmark_delegate*/
    #2497b25c1f7568d4b55009dcf40f2b5114ff874c6602d395a4e9fe0a
)
}(
    /*__helios__scriptcontext__get_current_script_hash*/
    () -> {
                tag = __helios__data__tag(__helios__scriptcontext__purpose);

                __core__ifThenElse(
                    __core__equalsInteger(tag, 0),
                    __helios__scriptcontext__get_current_minting_policy_hash,
                    () -> {
                        __core__ifThenElse(
                            __core__equalsInteger(tag, 1),
                            __helios__scriptcontext__get_current_validator_hash,
                            __helios__scriptcontext__get_current_staking_validator_hash
                        )()
                    }
                )()
            }
)
}(
    /*__helios__scriptcontext__get_current_staking_validator_hash*/
    () -> {
        pair = __core__unConstrData(__helios__scriptcontext__purpose);
        tag = __core__fstPair(pair);
        data = __core__headList(__core__sndPair(pair));

        hash = __core__ifThenElse(
            __core__equalsInteger(tag, 2),
            () -> {
                // rewarding
                __helios__common__enum_field_0(__helios__common__enum_field_0(data))
            },
            () -> {
                // certifying
                __helios__common__enum_field_0(__helios__common__enum_field_0(__helios__common__enum_field_0(data)))
            }
        )();

        __helios__stakingvalidatorhash__from_data(hash)
    }
)
}(
    /*__helios__stakingvalidatorhash__from_data*/
    __helios__bytearray__from_data
)
}(
    /*__helios__scriptcontext__get_current_validator_hash*/
    () -> {
        __helios__spendingcredential__validator__hash(
            __helios__spendingcredential__validator__cast(
                __helios__address__credential(
                    __helios__txoutput__address(
                        __helios__txinput__output(
                            __helios__scriptcontext__get_current_input()
                        )
                    )
                )
            )
        )
    }
)
}(
    /*__helios__address__credential*/
    __helios__common__enum_field_0
)
}(
    /*__helios__spendingcredential__validator__cast*/
    (data) -> {
        __helios__common__assert_constr_index(data, 1)
    }
)
}(
    /*__helios__common__assert_constr_index*/
    (data, i) -> {
        __core__ifThenElse(
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i),
            () -> {data},
            () -> {__helios__error("unexpected constructor index")}
        )()
    }
)
}(
    /*__helios__spendingcredential__validator__hash*/
    (self) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self))
    }
)
}(
    /*__helios__validatorhash__from_data*/
    __helios__bytearray__from_data
)
}(
    /*__helios__scriptcontext__get_current_minting_policy_hash*/
    () -> {
        __helios__mintingpolicyhash__from_data(__helios__scriptcontext__get_spending_purpose_output_id())
    }
)
}(
    /*__helios__data__tag*/
    (self) -> {
        __core__fstPair(__core__unConstrData(self))
    }
)
}(
    /*__helios__cip67__reference_token_label*/
    #000643b0
)
}(
    /*__helios__bytearray__starts_with*/
    (self) -> {
        __helios__common__starts_with(self, __core__lengthOfByteString)
    }
)
}(
    /*__helios__common__starts_with*/
    (self, selfLengthFn) -> {
        (prefix) -> {
            (n, m) -> {
                __core__ifThenElse(
                    __core__lessThanInteger(n, m),
                    () -> {false},
                    () -> {
                        __core__equalsByteString(prefix, __core__sliceByteString(0, m, self))
                    }
                )()
            }(selfLengthFn(self), __core__lengthOfByteString(prefix))
        }
    }
)
}(
    /*__helios__string__encode_utf8*/
    (self) -> {
        () -> {
            __core__encodeUtf8(self)
        }
    }
)
}(
    /*__helios__mintingpolicyhash__from_script_hash*/
    __helios__common__identity
)
}(
    /*__helios__assetclass__mph*/
    (self) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__enum_field_0(self))
    }
)
}(
    /*__helios__scriptcontext__get_current_input*/
    () -> {
        id = __helios__scriptcontext__get_spending_purpose_output_id();
        recurse = (recurse, lst) -> {
            __core__chooseList(
                lst,
                () -> {__helios__error("not found")},
                () -> {
                    item = __core__headList__safe(lst);
                    __core__ifThenElse(
                        __core__equalsData(__helios__txinput__output_id(item), id),
                        () -> {item},
                        () -> {recurse(recurse, __core__tailList__safe(lst))}
                    )()
                }
            )()
        };
        recurse(recurse, __helios__tx__inputs(__helios__scriptcontext__tx))
    }
)
}(
    /*__helios__scriptcontext__get_spending_purpose_output_id*/
    () -> {
        __helios__common__enum_field_0(__helios__scriptcontext__purpose)
    }
)
}(
    /*__helios__scriptcontext__purpose*/
    __helios__common__enum_field_1(__helios__scriptcontext__data)
)
}(
    /*__helios__value__get_singleton_policy*/
    (self) -> {
            () -> {
                __core__chooseList(
                    self,
                    () -> {
                        __helios__error("value doesn't contain a policy")
                    },
                    () -> {
                        mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(self)));
                        tail = __core__tailList(self);
                        __core__ifThenElse(
                            __core__equalsByteString(mph, #),
                            () -> {
                                __core__chooseList(
                                    tail,
                                    () -> {
                                        __helios__error("value contains only lovelace and no other minting policy")
                                    },
                                    () -> {
                                        mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(tail)));

                                        __core__chooseList(
                                            __core__tailList(tail),
                                            () -> {
                                                mph
                                            },
                                            () -> {
                                                __helios__error("value contains more than 1 minting policy")
                                            }
                                        )()
                                    }
                                )()
                            },
                            () -> {
                                __core__chooseList(
                                    tail,
                                    () -> {
                                        mph
                                    },
                                    () -> {
                                        next_mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(tail)));

                                        __core__ifThenElse(
                                            __core__equalsByteString(next_mph, #),
                                            () -> {
                                                __core__chooseList(
                                                    __core__tailList(tail),
                                                    () -> {
                                                        mph
                                                    },
                                                    () -> {
                                                        __helios__error("value contains more than 1 minting policy")
                                                    }
                                                )()
                                            },
                                            () -> {
                                                __helios__error("value contains more than 1 minting policy")
                                            }
                                        )()
                                    }
                                )()
                            }
                        )()
                    }
                )()
            }
        }
)
}(
    /*__helios__mintingpolicyhash__from_data*/
    __helios__bytearray__from_data
)
}(
    /*__helios__tx__minted*/
    (self) -> {
        __core__unMapData(__helios__common__enum_field_4(self))
    }
)
}(
    /*__helios__common__enum_field_4*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_3(self))
    }
)
}(
    /*__helios__value__get_policy_safe*/
    (self) -> {
        (mph_) -> {
            mph = __helios__mintingpolicyhash____to_data(mph_);
            recurse = (recurse, map) -> {
                __core__chooseList(
                    map,
                    () -> {__core__mkNilPairData(())},
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), mph),
                            () -> {
                                __core__unMapData(__core__sndPair(__core__headList__safe(map)))
                            },
                            () -> {
                                recurse(recurse, __core__tailList__safe(map))
                            }
                        )()
                    }
                )()
            };
            recurse(recurse, self)
        } 
    }
)
}(
    /*__helios__address__from_validator*/
    (vh) -> {
            __helios__address__new(
                __helios__spendingcredential__new_validator(vh),
                __helios__option__NONE
            )
        }
)
}(
    /*__helios__option__NONE*/
    __core__constrData(1, __helios__common__list_0)
)
}(
    /*__helios__spendingcredential__new_validator*/
    (hash) -> {
        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash)))
    }
)
}(
    /*__helios__validatorhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__address__new*/
    (cred, staking_cred) -> {
        __core__constrData(0, __helios__common__list_2(cred, staking_cred))
    }
)
}(
    /*__helios__real____leq*/
    __helios__int____leq
)
}(
    /*__helios__real____gt*/
    __helios__int____gt
)
}(
    /*__helios__real____lt*/
    __helios__int____lt
)
}(
    /*__helios__int____lt*/
    __core__lessThanInteger
)
}(
    /*__helios__common__struct_field_0*/
    __core__headList
)
}(
    /*__helios__real__from_data*/
    __helios__int__from_data
)
}(
    /*__helios__common__struct_field_1*/
    (self) -> {
        __core__headList(__helios__common__struct_fields_after_0(self))
    }
)
}(
    /*__helios__common__struct_fields_after_0*/
    __core__tailList
)
}(
    /*__helios__common__length*/
    (lst) -> {
        (recurse) -> {
            recurse(recurse, lst)
        }(
            (recurse, lst) -> {
                __core__chooseList(
                    lst, 
                    () -> {0}, 
                    () -> {__core__addInteger(recurse(recurse, __core__tailList__safe(lst)), 1)}
                )()
            }
        )
    }
)
}(
    /*__helios__int____leq*/
    __core__lessThanEqualsInteger
)
}(
    /*__helios__ratio__new*/
    (top, bottom) -> {
        __core__ifThenElse(
            __core__lessThanInteger(bottom, 0),
            () -> {
                __helios__ratio__new_internal(__core__multiplyInteger(top, -1), __core__multiplyInteger(bottom, -1))
            },
            () -> {
                __helios__ratio__new_internal(top, bottom)
            }
        )()
    }
)
}(
    /*__helios__ratio__new_internal*/
    (top, bottom) -> {
        __core__listData(
            __core__mkCons(
                __core__iData(top),
                __core__mkCons(
                    __core__iData(bottom), 
                    __core__mkNilData(())
                )
            )
        )
    }
)
}(
    /*__helios__real____to_data*/
    __helios__int____to_data
)
}(
    /*__helios__real__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__bytearray__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, false, true)
    }
)
}(
    /*__helios__stakingvalidatorhash__is_valid_data*/
    __helios__bytearray__is_valid_data_fixed_length(28)
)
}(
    /*__helios__pubkeyhash__is_valid_data*/
    __helios__bytearray__is_valid_data_fixed_length(28)
)
}(
    /*__helios__bytearray__is_valid_data_fixed_length*/
    (n) -> {
        (data) -> {
            __core__chooseData(
                data,
                () -> {false},
                () -> {false},
                () -> {false},
                () -> {false},
                () -> {
                    bytes = __core__unBData__safe(data);
                    __core__ifThenElse(
                        __core__equalsInteger(__core__lengthOfByteString(bytes), n),
                        () -> {
                            true
                        },
                        () -> {
                            false
                        }
                    )()
                }
            )()
        }
    }
)
}(
    /*__helios__stakingvalidatorhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__int____gt*/
    (a, b) -> {
        __helios__bool____not(__core__lessThanEqualsInteger(a, b))
    }
)
}(
    /*__helios__bool____not*/
    (b) -> {
        __core__ifThenElse(b, false, true)
    }
)
}(
    /*__helios__value__get_singleton_asset_class*/
    (self) -> {
            () -> {
                recurse = (map, found, asset_class) -> {
                    __core__chooseList(
                        map,
                        () -> {
                            __core__ifThenElse(
                                found,
                                () -> {
                                    asset_class
                                },
                                () -> {
                                    __helios__error("doesn't contain a singleton asset class")
                                }
                            )()
                        },
                        () -> {
                            head = __core__headList(map);
                            tail = __core__tailList(map);
                            mph = __core__unBData(__core__fstPair(head));

                            __core__ifThenElse(
                                // ignore ada
                                __core__equalsByteString(mph, #),
                                () -> {
                                    recurse(tail, found, asset_class)
                                },
                                () -> {
                                    __core__ifThenElse(
                                        found,
                                        () -> {
                                            __helios__error("not singleton, contains multiple assetclasses")
                                        },
                                        () -> {
                                            // parse asset class entry
                                            tokens = __core__unMapData(__core__sndPair(head));
            
                                            // assert no other tokens
                                            __core__chooseList(
                                                __core__tailList(tokens),
                                                () -> {
                                                    first = __core__headList(tokens);
                                                    qty = __core__unIData(__core__sndPair(first));

                                                    // assert qty is 1
                                                    __core__ifThenElse(
                                                        __core__equalsInteger(qty, 1),
                                                        () -> {
                                                            name = __core__unBData(__core__fstPair(first));
                                                            recurse(tail, true, __helios__assetclass__new(mph, name))
                                                        },
                                                        () -> {
                                                            __helios__error("not singleton, qty is not 1")
                                                        }
                                                    )()
                                                },
                                                () -> {
                                                    __helios__error("not singleton, has other token names")
                                                }
                                            )()
                                        }
                                    )()
                                }
                            )()
                        }
                    )()
                };
                recurse(self, false, ())
            }
        }
)
}(
    /*__helios__assetclass__new*/
    (mph, token_name) -> {
        __core__constrData(0, __helios__common__list_2(
            __helios__mintingpolicyhash____to_data(mph), 
            __helios__bytearray____to_data(token_name)
        ))
    }
)
}(
    /*__helios__mintingpolicyhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__common__list_2*/
    (arg0, arg1) -> {
        __core__mkCons(arg0, __helios__common__list_1(arg1))
    }
)
}(
    /*__helios__common__list_1*/
    (a) -> {
        __core__mkCons(a, __helios__common__list_0)
    }
)
}(
    /*__helios__common__list_0*/
    __core__mkNilData(())
)
}(
    /*__helios__assetclass____eq*/
    __helios__common____eq
)
}(
    /*__helios__txoutput__from_data*/
    __helios__common__identity
)
}(
    /*__helios__common__cip68_field*/
    (self, name) -> {
        map = __core__unMapData(__core__headList(__core__sndPair(__core__unConstrData(self))));
        __helios__common__cip68_field_internal(map, name)
    }
)
}(
    /*__helios__common__cip68_field_internal*/
    (map, name) -> {
        name_data = __core__bData(name);
        recurse = (recurse, map) -> {
            __core__chooseList(
                map,
                () -> {
                    __helios__error(
                        __core__appendString(
                            "field ",
                            __core__appendString(
                                __helios__bytearray__show(name)(),
                                " not found in struct"
                            )
                        )
                    )
                },
                () -> {
                    head = __core__headList__safe(map);
                    key = __core__fstPair(head);
                    value = __core__sndPair(head);
                    __core__ifThenElse(
                        __core__equalsData(key, name_data),
                        () -> {
                            value
                        },
                        () -> {
                            recurse(recurse, __core__tailList__safe(map))
                        }
                    )()
                }
            )()
        };
        recurse(recurse, map)
    }
)
}(
    /*__helios__string__from_data*/
    (d) -> {
        __core__decodeUtf8(__core__unBData(d))
    }
)
}(
    /*__helios__bool__is_valid_data*/
    (data) -> {
        __core__chooseData(
            data,
            () -> {
                pair = __core__unConstrData__safe(data);
                index = __core__fstPair(pair);
                fields = __core__sndPair(pair);
                __core__chooseList(
                    fields,
                    () -> {
                        __core__ifThenElse(
                            __core__equalsInteger(0, index),
                            () -> {
                                true
                            },
                            () -> {
                                __core__ifThenElse(
                                    __core__equalsInteger(1, index),
                                    () -> {
                                        true
                                    },
                                    () -> {
                                        false
                                    }
                                )()
                            }
                        )()
                    },
                    () -> {
                        false
                    }
                )()
            },
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {false}
        )()
    }
)
}(
    /*__helios__assetclass__is_valid_data*/
    (data) -> {
        __helios__common__test_constr_data_2(data, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data_max_length(32))
    }
)
}(
    /*__helios__bytearray__is_valid_data_max_length*/
    (n) -> {
        (data) -> {
            __core__chooseData(
                data,
                () -> {false},
                () -> {false},
                () -> {false},
                () -> {false},
                () -> {
                    bytes = __core__unBData__safe(data);
                    __core__ifThenElse(
                        __core__lessThanEqualsInteger(__core__lengthOfByteString(bytes), n),
                        () -> {
                            true
                        },
                        () -> {
                            false
                        }
                    )()
                }
            )()
        }    
    }
)
}(
    /*__helios__mintingpolicyhash__is_valid_data*/
    (data) -> {
                __core__chooseData(
                    data,
                    () -> {false},
                    () -> {false},
                    () -> {false},
                    () -> {false},
                    () -> {
                        bytes = __core__unBData__safe(data);
                        n = __core__lengthOfByteString(bytes);
                        __core__ifThenElse(
                            __core__equalsInteger(n, 0),
                            () -> {
                                true
                            },
                            () -> {
                                __core__ifThenElse(
                                    __core__equalsInteger(n, 28),
                                    true,
                                    false
                                )
                            }
                        )()
                    }
                )()
            }
)
}(
    /*__helios__common__test_constr_data_2*/
    (data, index, test_a, test_b) -> {
        __core__chooseData(
            data,
            () -> {
                pair = __core__unConstrData__safe(data);
                __core__ifThenElse(
                    __core__equalsInteger(__core__fstPair(pair), index),
                    () -> {
                        fields = __core__sndPair(pair);
                        __core__chooseList(
                            fields,
                            () -> {
                                false
                            },
                            () -> {
                                __core__ifThenElse(
                                    test_a(__core__headList__safe(fields)),
                                    () -> {
                                        tail = __core__tailList__safe(fields);
                                        __core__chooseList(
                                            tail,
                                            () -> {
                                                false
                                            },
                                            () -> {
                                                __core__ifThenElse(
                                                    test_b(__core__headList__safe(tail)),
                                                    () -> {
                                                        __core__chooseList(
                                                            __core__tailList__safe(tail), 
                                                            () -> {
                                                                true
                                                            },
                                                            () -> {
                                                                false
                                                            }
                                                        )()
                                                    },
                                                    () -> {
                                                        false
                                                    }
                                                )()
                                            }
                                        )()
                                    },
                                    () -> {
                                        false
                                    }
                                )()
                            }
                        )()
                    },
                    () -> {
                        false
                    }
                )()
            },
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {false}
        )()
    }
)
}(
    /*__helios__txinput__from_data*/
    __helios__common__identity
)
}(
    /*__helios__ratio__is_valid_data*/
    (data) -> {
        __helios__common__test_list_data(
            data,
            __helios__common__test_list_head_data(
                __helios__int__is_valid_data,
                __helios__common__test_list_head_data(
                    (bottom_data) -> {
                        __core__chooseData(
                            bottom_data,
                            () -> {false},
                            () -> {false},
                            () -> {false},
                            () -> {
                                bottom = __core__unIData__safe(bottom_data);

                                __core__ifThenElse(
                                    __core__lessThanInteger(0, bottom),
                                    () -> {
                                        true
                                    },
                                    () -> {
                                        false
                                    }
                                )()
                            },
                            () -> {false}
                        )()
                    },
                    __helios__common__test_list_empty
                )
            )
        )
    }
)
}(
    /*__helios__common__test_list_empty*/
    (list) -> {
            __core__chooseList(list, true, false)
        }
)
}(
    /*__helios__common__test_list_head_data*/
    (test_head, test_tail) -> {
            (list) -> {
                __core__chooseList(
                    list,
                    () -> {
                        false
                    },
                    () -> {
                        __core__ifThenElse(
                            test_head(__core__headList(list)),
                            () -> {
                                test_tail(__core__tailList(list))
                            },
                            () -> {
                                false
                            }
                        )()
                    }
                )()
            }
        }
)
}(
    /*__helios__common__test_list_data*/
    (data, fn) -> {
            __core__chooseData(
                data,
                () -> {false},
                () -> {false},
                () -> {fn(__core__unListData(data))},
                () -> {false},
                () -> {false}
            )()
        }
)
}(
    /*__helios__duration__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__ratio____to_data*/
    __helios__common__identity
)
}(
    /*__helios__duration____to_data*/
    __helios__int____to_data
)
}(
    /*__helios__time__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__int__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, true, false)
    }
)
}(
    /*__helios__struct____eq*/
    (self, other) -> {
            __core__equalsData(__helios__struct____to_data(self), __helios__struct____to_data(other))
        }
)
}(
    /*__helios__struct____to_data*/
    __core__listData
)
}(
    /*__helios__struct__from_data*/
    __core__unListData
)
}(
    /*__helios__time____to_data*/
    __helios__int____to_data
)
}(
    /*__helios__int____to_data*/
    __core__iData
)
}(
    /*__helios__tx__outputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_2(self))
    }
)
}(
    /*__helios__txoutput__datum*/
    __helios__common__enum_field_2
)
}(
    /*__helios__common__enum_field_2*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_1(self))
    }
)
}(
    /*__helios__txoutputdatum__inline*/
    (self) -> {
        pair = __core__unConstrData(self);
        index = __core__fstPair(pair);
        fields = __core__sndPair(pair);
        __core__ifThenElse(
            __core__equalsInteger(index, 2),
            () -> {
                __core__headList(fields)
            },
            () -> {
                __helios__error("not an inline datum")
            }
        )()
    }
)
}(
    /*__helios__assert*/
    (cond, msg) -> {
        __core__ifThenElse(
            cond,
            () -> {
                ()
            },
            () -> {
                __core__trace(
                    msg,
                    () -> {
                        error()
                    }
                )()
            }
        )()
    }
)
}(
    /*__helios__value__get*/
    (self) -> {
        (assetClass) -> {
            mph = __helios__common__enum_field_0(assetClass);
            tokenName = __helios__common__enum_field_1(assetClass);
            outer = (outer, inner, map) -> {
                __core__chooseList(
                    map, 
                    () -> {
                        __helios__error(
                            __helios__string____add(
                                __helios__string____add(
                                    "policy ", 
                                    __helios__mintingpolicyhash__show(__core__unBData(mph))()
                                ),
                                " not found"
                            )
                        )
                    },
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), mph), 
                            () -> {inner(inner, __core__unMapData(__core__sndPair(__core__headList__safe(map))))}, 
                            () -> {outer(outer, inner, __core__tailList__safe(map))}
                        )()
                    }
                )()
            };
            inner = (inner, map) -> {
                __core__chooseList(
                    map, 
                    () -> {__helios__error("tokenName not found")}, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), tokenName),
                            () -> {
                                __core__unIData(__core__sndPair(__core__headList__safe(map)))
                            },
                            () -> {
                                inner(inner, __core__tailList__safe(map))
                            }
                        )()
                    }
                )()
            };
            outer(outer, inner, self)
        }
    }
)
}(
    /*__helios__mintingpolicyhash__show*/
    __helios__bytearray__show
)
}(
    /*__helios__bytearray__show*/
    (self) -> {
        () -> {
            recurse = (recurse, self) -> {
                n = __core__lengthOfByteString(self);
                __core__ifThenElse(
                    __core__lessThanInteger(0, n),
                    () -> {
                        __core__appendString(
                            __core__decodeUtf8__safe(
                                hex_bytes = (
                                    __core__encodeUtf8(
                                        __helios__int__to_hex(
                                            __core__indexByteString__safe(self, 0)
                                        )()
                                    )
                                );
                                __core__ifThenElse(
                                    __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),
                                    __core__consByteString(48, hex_bytes),
                                    hex_bytes
                                )
                            ), 
                            recurse(recurse, __core__sliceByteString(1, n, self))
                        )
                    },
                    () -> {
                        ""
                    }
                )()
            };
            recurse(recurse, self)
        }
    }
)
}(
    /*__helios__int__to_hex*/
    (self) -> {
        () -> {
            recurse = (self, bytes) -> {
                digit = __core__modInteger(self, 16);
                bytes = __core__consByteString(
                    __core__ifThenElse(
                        __core__lessThanInteger(digit, 10), 
                        __core__addInteger(digit, 48), 
                        __core__addInteger(digit, 87)
                    ), 
                    bytes
                );
                __core__ifThenElse(
                    __core__lessThanInteger(self, 16),
                    () -> {bytes},
                    () -> {
                        recurse(__core__divideInteger(self, 16), bytes)
                    }
                )()
            };
            __core__decodeUtf8__safe(
                __core__ifThenElse(
                    __core__lessThanInteger(self, 0),
                    () -> {
                        __core__consByteString(
                            45,
                            recurse(__core__multiplyInteger(self, -1), #)
                        )
                    },
                    () -> {
                        recurse(self, #)
                    }
                )()
            )
        }
    }
)
}(
    /*__helios__string____add*/
    __core__appendString
)
}(
    /*__helios__txinput__address*/
    (self) -> {
        __helios__txoutput__address(__helios__txinput__output(self))
    }
)
}(
    /*__helios__txoutput__address*/
    __helios__common__enum_field_0
)
}(
    /*__helios__address____eq*/
    __helios__common____eq
)
}(
    /*__helios__txinput__value*/
    (self) -> {
        __helios__txoutput__value(__helios__txinput__output(self))
    }
)
}(
    /*__helios__txinput__output*/
    __helios__common__enum_field_1
)
}(
    /*__helios__txoutput__value*/
    (self) -> {
        __core__unMapData(__helios__common__enum_field_1(self))
    }
)
}(
    /*__helios__value__get_safe*/
    (self) -> {
        (assetClass) -> {
            mintingPolicyHash = __helios__common__enum_field_0(assetClass);
            tokenName = __helios__common__enum_field_1(assetClass);
            outer = (outer, inner, map) -> {
                __core__chooseList(
                    map, 
                    () -> {0}, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), mintingPolicyHash), 
                            () -> {inner(inner, __core__unMapData(__core__sndPair(__core__headList__safe(map))))}, 
                            () -> {outer(outer, inner, __core__tailList__safe(map))}
                        )()
                    }
                )()
            };
            inner = (inner, map) -> {
                __core__chooseList(
                    map, 
                    () -> {0}, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), tokenName),
                            () -> {
                                __core__unIData(__core__sndPair(__core__headList__safe(map)))
                            },
                            () -> {
                                inner(inner, __core__tailList__safe(map))
                            }
                        )()
                    }
                )()
            };
            outer(outer, inner, self)
        }
    }
)
}(
    /*__helios__common__enum_field_1*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_0(self))
    }
)
}(
    /*__helios__txoutputid__from_data*/
    __helios__common__identity
)
}(
    /*__helios__pubkeyhash__from_data*/
    __helios__bytearray__from_data
)
}(
    /*__helios__bytearray__from_data*/
    __core__unBData
)
}(
    /*__helios__int__from_data*/
    __core__unIData
)
}(
    /*__helios__common__map_get*/
    (self, key, fnFound, fnNotFound) -> {
        (recurse) -> {
            recurse(recurse, self, key)
        }(
            (recurse, self, key) -> {
                __core__chooseList(
                    self, 
                    fnNotFound, 
                    () -> {
                        (head) -> {
                            __core__ifThenElse(
                                __core__equalsData(key, __core__fstPair(head)), 
                                () -> {fnFound(__core__sndPair(head))}, 
                                () -> {recurse(recurse, __core__tailList__safe(self), key)}
                            )()
                        }(__core__headList__safe(self))
                    }
                )()
            }
        )
    }
)
}(
    /*__helios__int____eq*/
    __core__equalsInteger
)
}(
    /*__helios__string____eq*/
    __core__equalsString
)
}(
    /*__helios__bool__trace_if_false*/
    (self) -> {
        (msg) -> {
            __core__ifThenElse(
                self,
                () -> {
                    self
                },
                () -> {
                    __core__trace(msg, self)
                }
            )()
        }
    }
)
}(
    /*__helios__duration__DAY*/
    86400000
)
}(
    /*__helios__tx__is_signed_by*/
    (self) -> {
        (hash) -> {
            hash = __helios__pubkeyhash____to_data(hash);
            __helios__common__any(
                __helios__tx__signatories(self),
                (signatory) -> {
                    __core__equalsData(signatory, hash)
                }
            )
        }
    }
)
}(
    /*__helios__tx__signatories*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_8(self))
    }
)
}(
    /*__helios__common__enum_field_8*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_7(self))
    }
)
}(
    /*__helios__common__enum_fields_after_7*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_6(self))
    }
)
}(
    /*__helios__common__enum_fields_after_6*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_5(self))
    }
)
}(
    /*__helios__common__enum_fields_after_5*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_4(self))
    }
)
}(
    /*__helios__common__enum_fields_after_4*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_3(self))
    }
)
}(
    /*__helios__common__enum_fields_after_3*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_2(self))
    }
)
}(
    /*__helios__common__enum_fields_after_2*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_1(self))
    }
)
}(
    /*__helios__common__enum_fields_after_1*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_0(self))
    }
)
}(
    /*__helios__common__enum_fields_after_0*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields(self))
    }
)
}(
    /*__helios__common__any*/
    (self, fn) -> {
        (recurse) -> {
            recurse(recurse, self, fn)
        }(
            (recurse, self, fn) -> {
                __core__chooseList(
                    self, 
                    () -> {false}, 
                    () -> {
                        __core__ifThenElse(
                            fn(__core__headList__safe(self)),
                            () -> {true}, 
                            () -> {recurse(recurse, __core__tailList__safe(self), fn)}
                        )()
                    }
                )()
            }
        )
    }
)
}(
    /*__helios__pubkeyhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__bytearray____to_data*/
    __core__bData
)
}(
    /*__helios__duration__WEEK*/
    604800000
)
}(
    /*__helios__duration____mul*/
    __helios__int____mul
)
}(
    /*__helios__int____mul*/
    __core__multiplyInteger
)
}(
    /*__helios__time__new*/
    __helios__common__identity
)
}(
    /*__helios__common__identity*/
    (self) -> {self}
)
}(
    /*__helios__bool__and*/
    (a, b) -> {
        __core__ifThenElse(
            a(), 
            () -> {b()}, 
            () -> {false}
        )()
    }
)
}(
    /*__helios__txinput__output_id*/
    __helios__common__enum_field_0
)
}(
    /*__helios__txoutputid____eq*/
    __helios__common____eq
)
}(
    /*__helios__common____eq*/
    __core__equalsData
)
}(
    /*__helios__scriptcontext__tx*/
    __helios__common__enum_field_0(__helios__scriptcontext__data)
)
}(
    /*__helios__scriptcontext__data*/
    __CONTEXT
)
}(
    /*__helios__tx__inputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_0(self))
    }
)
}(
    /*__helios__common__enum_field_0*/
    (self) -> {
        __core__headList(__helios__common__enum_fields(self))
    }
)
}(
    /*__helios__common__enum_fields*/
    (self) -> {
        __core__sndPair(__core__unConstrData(self))
    }
)
}(
    /*__helios__mixedargs__spending____is*/
    (data) -> {
                __helios__common__enum_tag_equals(data, 1)
            }
)
}(
    /*__helios__common__enum_tag_equals*/
    (data, i) -> {
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i)
        }
)
}(
    /*__helios__error*/
    (msg) -> {
        __core__trace(
            msg, 
            () -> {
                error()
            }
        )()
    }
)
    };
    tag = __core__fstPair(__core__unConstrData(__REDEEMER_OR_CONTEXT));
    __core__ifThenElse(
        __core__equalsInteger(tag, 0),
        () -> {
            // other (no datum)
            mixed = __core__constrData(
                0,
                __core__mkCons(
                    __core__headList(__core__sndPair(__core__unConstrData(__DATUM_OR_REDEEMER))),
                    __core__mkNilData(())
                )
            );
            main(mixed, __REDEEMER_OR_CONTEXT)
        },
        () -> {
            mixed = __core__constrData(
                1, 
                __core__mkCons(
                    __DATUM_OR_REDEEMER, 
                    __core__mkCons(
                        __core__headList(__core__sndPair(__core__unConstrData(__REDEEMER_OR_CONTEXT))),
                        __core__mkNilData(())
                    )
                )
            );
            // spending
            (__CONTEXT) -> {
                main(mixed, __CONTEXT)
            }
        }
    )()
}`

    const uplcProgram0 = compile(src, {
        optimize: false,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
    const uplcProgram1 = compile(src, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })

    const args = [
        "40",
        "d87a9f00ff",
        "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581c133a4e7c8cf52a01e284b1aab5d4fa1060ed953dad931759e053d39affd87a80ffa240a1401a001e8480581c659553fcfb8afdcb1aa141d781a629e9bc06b8014102095b469aad05a146737570706c7901d87b9f9f001a3b9aca0000001b000000174876e800009f00001b0000000757b12c009f186401ffffffffd87a80ffffd8799fd8799fd8799f58200101010101010101010101010101010101010101010101010101010101010101ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffff8080a0a140a1400080a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff80a0a0d8799f5820ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd87a9fd8799fd8799f58200101010101010101010101010101010101010101010101010101010101010101ff00ffffff"
    ].map((cbor) => makeUplcDataValue(decodeUplcData(cbor)))

    /**
     * @param {UplcProgramV2} program
     */
    const evalProgram = (program) => {
        const res = program.eval(args)

        if (isRight(res.result)) {
            return "result: " + res.result.right.toString()
        } else if (isLeft(res.result)) {
            return "error"
        }
    }

    strictEqual(evalProgram(uplcProgram0), evalProgram(uplcProgram1))
})
