import SpoonError from '../../SpoonError';
export declare enum SpoonAuthErrorType {
    TokenExpired = 0,
    AuthFailed = 1,
    RefreshFailed = 2,
    ChangePasswordFailed = 3,
    RestorePasswordFailed = 4,
    JwtPayloadMalformed = 5
}
export default class SpoonAndForkAuthError extends SpoonError {
    readonly type: SpoonAuthErrorType;
    constructor(message: string, type: SpoonAuthErrorType);
}
