import AdditionalUserInfo from 'entities/AdditionalUserInfo';

export default interface User {
  id: string;
  image?: string;
  name: string;
  additionalInfo?: AdditionalUserInfo;
}
