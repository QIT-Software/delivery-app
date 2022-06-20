"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processError = void 0;
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const SpoonAndForkAuthError_1 = __importStar(require("../../managers/auth/SpoonAndForkAuthError"));
function processAuthError(error) {
    switch (error.type) {
        case SpoonAndForkAuthError_1.SpoonAuthErrorType.TokenExpired:
        case SpoonAndForkAuthError_1.SpoonAuthErrorType.AuthFailed:
        case SpoonAndForkAuthError_1.SpoonAuthErrorType.RefreshFailed:
            throw new common_1.UnauthorizedException(error.message);
    }
}
function processError(error) {
    if (error instanceof SpoonError_1.default) {
        if (error instanceof SpoonAndForkAuthError_1.default) {
            processAuthError(error);
        }
        throw new common_1.BadRequestException(error.message);
    }
    else {
        throw error;
    }
}
exports.processError = processError;
//# sourceMappingURL=ErrorUtils.js.map