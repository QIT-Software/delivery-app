import React from 'react';
import {Route} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import {RouteProps} from 'react-router';

interface AppRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: React.ComponentType<any>;
}

const AppRoute: React.FC<AppRouteProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default AppRoute;
