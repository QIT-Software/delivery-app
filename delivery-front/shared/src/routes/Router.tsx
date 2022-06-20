import React from 'react';
import {Route} from 'react-router';
import Auth from 'routes/auth/Auth';

export const Router: React.FC = () => {
  return (
    <>
      <Route path="/auth">
        <Auth />
      </Route>
    </>
  );
};
