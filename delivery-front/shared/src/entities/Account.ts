import User from './User';
import AdditionalUserInfo from './AdditionalUserInfo';

export interface Account {
  user: User;
  info: AdditionalUserInfo;
}
