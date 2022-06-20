import React from 'react';
import {Route} from 'react-router';
import Welcome from './welcome/Welcome';
import ForgotPassword from './forgotPassword/ForgotPassword';
import SignUp from './signUp/SignUp';
import {useGuard} from 'state/hooks/UseGuard';

const Auth: React.FC = () => {
  useGuard({requireAuthenticated: false});

  return (
    <>
      <Route exact path="/auth" component={Welcome} />
      <Route exact path="/auth/forgotPassword" component={ForgotPassword} />
      <Route exact path="/auth/signUp" component={SignUp} />
    </>
  );
};

export default Auth;
