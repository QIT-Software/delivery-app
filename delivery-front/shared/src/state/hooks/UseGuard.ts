import {useEffect, useState} from 'react';
import {AuthInfoKeeper} from 'auth';
import {useHistory} from 'react-router-native';
import Cart from 'entities/Cart';
import {SpoonAndForkApi} from 'api';
import {useCartActions} from 'state/client/hooks/UseActions';

interface UseGuardProps {
  requireAuthenticated?: boolean;
  authRoute?: string;
  mainRoute?: string;
  orderInProgress?: boolean;
}

export function useGuard({
  requireAuthenticated,
  authRoute = '/auth',
  mainRoute = '/main',
  orderInProgress,
}: UseGuardProps) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState<boolean>();
  const actions = useCartActions();
  const cartsList: Cart[] = [];

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated: boolean) =>
      setAuthenticated(isAuthenticated),
    );
    const listeners = () => setAuthenticated(!authenticated);
    AuthInfoKeeper.addListener(listeners);
    return () => {
      AuthInfoKeeper.removeListener(listeners);
    };
  }, []);

  useEffect(() => {
    if (requireAuthenticated !== undefined && authenticated !== undefined) {
      if (!requireAuthenticated) {
        if (authenticated) {
          history.push(mainRoute);
        }
      } else if (!authenticated) {
        history.push(authRoute);
      }
    }
  }, [authenticated]);

  useEffect(() => {
    if (orderInProgress) {
      SpoonAndForkApi.getUserCarts().then((data) => {
        data.map((cart) => cartsList.push(cart));
        cartsList.forEach((it) => {
          if (it.status === 'Active') {
            const {id} = it;
            return actions.cart(id);
          }
          return true;
        });
      });
    }
  }, [cartsList]);

  return {authenticated};
}
