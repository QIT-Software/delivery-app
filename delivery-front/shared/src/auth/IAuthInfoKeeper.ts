import Session from './Session';

export default interface IAuthInfoKeeper {
  initialize(): Promise<void>;
  update(resp: Session): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  authenticate(resp: Session): Promise<void>;
  getAuthInfo(): Promise<Session | undefined>;
  reset(): Promise<void>;
}
