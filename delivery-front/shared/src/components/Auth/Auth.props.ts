export interface AuthProps {
  title: string;
  description: string;
  arrowDown?: boolean;
  backBtn?: boolean;
  emailInput?: boolean;
  passwordInput?: boolean;
  nameInput?: boolean;
  phoneInput?: boolean;
  addressInput?: boolean;
  signUpBtn?: boolean;
  sendBtn?: boolean;
  visualStyle?: 'none' | 'card';
  forgotPassword?: boolean;
  noAccount?: boolean;
  rememberPassword?: boolean;
  modal?: boolean;
  signInBtnModal?: boolean;
  onPressHideButton?: () => void;
  // isForgotPasswordScreen?: boolean;
}
