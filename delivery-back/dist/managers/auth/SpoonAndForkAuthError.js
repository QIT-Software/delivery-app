"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpoonAuthErrorType = void 0;
const SpoonError_1 = __importDefault(require("../../SpoonError"));
var SpoonAuthErrorType;
(function (SpoonAuthErrorType) {
    SpoonAuthErrorType[SpoonAuthErrorType["TokenExpired"] = 0] = "TokenExpired";
    SpoonAuthErrorType[SpoonAuthErrorType["AuthFailed"] = 1] = "AuthFailed";
    SpoonAuthErrorType[SpoonAuthErrorType["RefreshFailed"] = 2] = "RefreshFailed";
    SpoonAuthErrorType[SpoonAuthErrorType["ChangePasswordFailed"] = 3] = "ChangePasswordFailed";
    SpoonAuthErrorType[SpoonAuthErrorType["RestorePasswordFailed"] = 4] = "RestorePasswordFailed";
    SpoonAuthErrorType[SpoonAuthErrorType["JwtPayloadMalformed"] = 5] = "JwtPayloadMalformed";
})(SpoonAuthErrorType = exports.SpoonAuthErrorType || (exports.SpoonAuthErrorType = {}));
class SpoonAndForkAuthError extends SpoonError_1.default {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}
exports.default = SpoonAndForkAuthError;
//# sourceMappingURL=SpoonAndForkAuthError.js.map