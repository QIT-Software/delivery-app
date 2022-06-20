import AdditionalUserInfo from 'entities/AdditionalUserInfo';

export default interface User {
  id: string;
  name: string;
  additionalInfo?: AdditionalUserInfo;
}
