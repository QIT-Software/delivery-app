import RegisterRequest from '../entities/RegisterRequest';
import IAuthManager from '../../managers/auth/IAuthManager';
import LoginRequest from '../entities/LoginRequest';
import AuthResponse from '../../entities/AuthResponse';
import RefreshTokenRequest from '../entities/RefreshTokenRequest';
import ForgotPasswordRequest from '../entities/RasswordRecoveryRequest';
import ChangePasswordRequest from '../entities/ChangePasswordRequest';
import Session from '../../entities/Session';
import { HttpRequestInfo } from 'enhancers/decorators/HttpRequest';
import FirebaseTokenRequest from 'api/entities/FirebaseTokenRequest';
export declare class AuthController {
    private readonly authManager;
    constructor(authManager: IAuthManager);
    register(request: RegisterRequest, { appType, platform }: HttpRequestInfo): Promise<AuthResponse>;
    login(request: LoginRequest, { appType, platform }: HttpRequestInfo): Promise<AuthResponse>;
    refresh(request: RefreshTokenRequest): Promise<AuthResponse>;
    forgotPassword(request: ForgotPasswordRequest): Promise<void>;
    changePassword(request: ChangePasswordRequest, session: Session): Promise<void>;
    addFirebaseRegistrationToken(request: FirebaseTokenRequest, session: Session): Promise<void>;
}
