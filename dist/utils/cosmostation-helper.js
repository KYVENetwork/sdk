"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CosmostationSigner = exports.cosmostationMethods = void 0;
var proto_signing_1 = require("@cosmjs/proto-signing");
exports.cosmostationMethods = {
    getSupportedChains: function () {
        return window.cosmostation.tendermint.request({
            method: "ten_supportedChainNames"
        });
    },
    addChain: function (params) {
        return window.cosmostation.tendermint.request({
            method: "ten_addChain",
            params: params
        });
    },
    requestAccount: function (chainId) {
        return window.cosmostation.tendermint.request({
            method: "ten_requestAccount",
            params: { chainName: chainId }
        });
    },
    signDirect: function (chainName, doc, options) {
        return window.cosmostation.tendermint.request({
            method: "ten_signDirect",
            params: {
                chainName: chainName,
                doc: doc,
                isEditMemo: !!(options === null || options === void 0 ? void 0 : options.memo),
                isEditFee: !!(options === null || options === void 0 ? void 0 : options.fee),
                gasRate: options === null || options === void 0 ? void 0 : options.gasRate
            }
        });
    },
    signAmino: function (chainName, doc, options) {
        return window.cosmostation.tendermint.request({
            method: "ten_signAmino",
            params: {
                chainName: chainName,
                doc: doc,
                isEditMemo: !!(options === null || options === void 0 ? void 0 : options.memo),
                isEditFee: !!(options === null || options === void 0 ? void 0 : options.fee),
                gasRate: options === null || options === void 0 ? void 0 : options.gasRate
            }
        });
    }
};
var CosmostationSigner = /** @class */ (function () {
    function CosmostationSigner(cosmostationAccount, network, cosmostationOption) {
        this.network = network;
        this.cosmostationAccount = cosmostationAccount;
        this.cosmostationOption = cosmostationOption;
    }
    CosmostationSigner.prototype.getAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            address: this.cosmostationAccount.address,
                            // Currently, only secp256k1 is supported.
                            algo: "secp256k1",
                            pubkey: this.cosmostationAccount.publicKey
                        },
                    ]];
            });
        });
    };
    CosmostationSigner.prototype.signDirect = function (signerAddress, signDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var signedResult, currentAccountAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.cosmostationMethods.signDirect(this.network.chainId, {
                            chain_id: signDoc.chainId,
                            body_bytes: signDoc.bodyBytes,
                            auth_info_bytes: signDoc.authInfoBytes,
                            account_number: signDoc.accountNumber.toString()
                        }, this.cosmostationOption)];
                    case 1:
                        signedResult = _a.sent();
                        return [4 /*yield*/, exports.cosmostationMethods.requestAccount(this.network.chainId)];
                    case 2:
                        currentAccountAddress = _a.sent();
                        if (this.cosmostationAccount.address !== currentAccountAddress.address) {
                            throw new Error("Unknown signer address");
                        }
                        return [2 /*return*/, {
                                signed: (0, proto_signing_1.makeSignDoc)(signedResult.signed_doc.body_bytes, signedResult.signed_doc.auth_info_bytes, signedResult.signed_doc.chain_id, Number(signedResult.signed_doc.account_number)),
                                signature: {
                                    pub_key: signedResult.pub_key,
                                    signature: signedResult.signature
                                }
                            }];
                }
            });
        });
    };
    return CosmostationSigner;
}());
exports.CosmostationSigner = CosmostationSigner;
