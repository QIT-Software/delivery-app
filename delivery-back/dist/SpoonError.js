"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpoonErrorType = void 0;
var SpoonErrorType;
(function (SpoonErrorType) {
    SpoonErrorType[SpoonErrorType["TokenExpired"] = 0] = "TokenExpired";
    SpoonErrorType[SpoonErrorType["AuthFailed"] = 1] = "AuthFailed";
    SpoonErrorType[SpoonErrorType["RefreshFailed"] = 2] = "RefreshFailed";
    SpoonErrorType[SpoonErrorType["ChangePasswordFailed"] = 3] = "ChangePasswordFailed";
    SpoonErrorType[SpoonErrorType["RestorePasswordFailed"] = 4] = "RestorePasswordFailed";
    SpoonErrorType[SpoonErrorType["JwtPayloadMalformed"] = 5] = "JwtPayloadMalformed";
})(SpoonErrorType = exports.SpoonErrorType || (exports.SpoonErrorType = {}));
class SpoonError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = SpoonError;
//# sourceMappingURL=SpoonError.js.map