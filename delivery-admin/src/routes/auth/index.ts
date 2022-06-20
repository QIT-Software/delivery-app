import React from 'react';

const ForgotPassword = React.lazy(() => import('./forgotPassword/ForgotPassword'));
const SignUp = React.lazy(() => import('./signUp/SignUp'));
const Welcome = React.lazy(() => import('./welcome/Welcome'));

export default {
  Welcome,
  SignUp,
  ForgotPassword,
};
