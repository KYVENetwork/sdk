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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var base_v1beta1_1 = __importDefault(require("./kyve/base.v1beta1"));
var gov_v1beta1_1 = __importDefault(require("./kyve/gov.v1beta1"));
var cosmos_1 = require("@keplr-wallet/cosmos");
var KyveClient = /** @class */ (function () {
    function KyveClient(client, account, aminoSigner) {
        this.account = account;
        this.nativeClient = client;
        this.aminoSigner = aminoSigner;
        this.kyve = {
            v1beta1: {
                base: new base_v1beta1_1["default"](this.nativeClient, this.account),
                gov: new gov_v1beta1_1["default"](this.nativeClient, this.account)
            }
        };
    }
    KyveClient.prototype.signString = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var signDoc, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.aminoSigner === null)
                            throw new Error("Wallet doesn't support adr-036");
                        signDoc = (0, cosmos_1.makeADR36AminoSignDoc)(this.account.address, message);
                        return [4 /*yield*/, this.aminoSigner.signAmino(this.account.address, signDoc)];
                    case 1:
                        signature = (_a.sent()).signature;
                        return [2 /*return*/, signature];
                }
            });
        });
    };
    return KyveClient;
}());
exports["default"] = KyveClient;
