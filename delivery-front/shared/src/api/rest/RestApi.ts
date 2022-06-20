import ApiBase from '@spryrocks/react-api/rest/ApiBase';
import RegisterRequest from '../entities/RegisterRequest';
import LoginRequest from '../entities/LoginRequest';
import RefreshRequest from 'api/entities/RefreshRequest';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import {ChangePasswordRequest} from 'api/entities/ChangePasswordRequest';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import Session from '@spryrocks/react-auth/Session';

export default class RestApi extends ApiBase {
  public async register(request: RegisterRequest) {
    return this.post<Session>(`auth/register`, request);
  }

  public async login(request: LoginRequest) {
    return this.post<Session>('auth/login', request);
  }

  public async refresh(refreshRequest: RefreshRequest) {
    return this.post<Session>('auth/refresh', refreshRequest);
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.post<void>('auth/forgotPassword', request);
  }

  public async changePassword(request: ChangePasswordRequest) {
    return this.put<void>('auth/password', request);
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.post<void>('auth/firebaseToken', request);
  }

  public async uploadFile(uri: string) {
    return this.postFile<string>('files', uri, 'file');
  }
}
