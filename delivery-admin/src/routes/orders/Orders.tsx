import React, {useEffect} from 'react';
import {useOrderActions} from 'state/hooks/UseActions';
import styles from './Orders.module.scss';
import {useSelector} from 'state/hooks';
import Table from 'components/Table/Table';
import Order from 'entities/Order';
import {useHistory} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';

const Orders: React.FC = () => {
  const {t} = useTranslation('order');
  const history = useHistory();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const orderActions = useOrderActions();

  const columns = React.useMemo(
    () => [
      {
        Header: t('orderNumber'),
        accessor: 'number',
      },
      {
        Header: t('date'),
        accessor: 'created',
      },
      {
        Header: t('customer'),
        accessor: 'client.name',
      },
      {
        Header: t('status'),
        accessor: 'state',
      },
    ],
    [],
  );

  useEffect(() => {
    orderActions.fetchOrders();
  }, []);

  // TODO: IMPLEMENT BETTER SOLUTION WITH TYPES
  const selectOrder = (order: Order) => {
    if (order.id) {
      orderActions.selectOrder(order.id);
    }
  };

  const data = useSelector((state) => state.orders);

  return (
    <div className={styles.container}>
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        rowClick={selectOrder}
        columns={columns}
        data={data.isSuccess ? data.orders : []}
      />
    </div>
  );
};

export default Orders;
