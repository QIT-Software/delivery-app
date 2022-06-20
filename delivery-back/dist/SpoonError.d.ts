export declare enum SpoonErrorType {
    TokenExpired = 0,
    AuthFailed = 1,
    RefreshFailed = 2,
    ChangePasswordFailed = 3,
    RestorePasswordFailed = 4,
    JwtPayloadMalformed = 5
}
export default class SpoonError extends Error {
    readonly message: string;
    constructor(message: string);
}
