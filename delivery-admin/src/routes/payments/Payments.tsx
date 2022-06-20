import React, {useEffect} from 'react';
// import {useRestaurantActions} from 'state/hooks/UseActions';
import styles from 'routes/payments/Payments.module.scss';
// // import {useSelector} from 'state/hooks';
import Table from 'components/Table/Table';
import Payment from 'entities/Payment';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';
// import Courier from 'entities/Courier';
import classNames from 'classnames';

const Payments: React.FC = () => {
  const {t} = useTranslation('payment');
  const history = useHistory();

  const {userType} = useParams();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: t('userId'),
        accessor: 'name',
      },
      {
        Header: t('userType'),
        accessor: 'userType',
      },
      {
        Header: t('sum'),
        accessor: 'sum',
      },
    ],
    [],
  );

  const data: Payment[] = [
    {
      id: '2260fb34-3ac1-488a-b24c-a0c0cc62863a',
      name: 'fa2b624a-de24-4e0d-8101-9b3067e69ac2',
      userType: 'Courier',
      sum: 126,
    },
    {
      id: '27fc9890-ca2f-46a2-84fd-87c03467fc8a',
      name: '57594635-daea-4f90-8b95-35251ae8b164',
      userType: 'Restaurant',
      sum: 425,
    },
    {
      id: '24d4fd48-f3e4-4b72-aa25-875d342c0d3f',
      name: 'aeb9ba7a-d220-416f-a3b1-0508e48697f5',
      userType: 'Courier',
      sum: 96,
    },
    {
      id: '98c38838-9ae0-4c11-bdeb-5c3231c73e8b',
      name: '9d463f63-5171-4933-b9fc-17c0d570d91a',
      userType: 'Courier',
      sum: 124,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <p
          className={classNames(
            userType === 'couriers' ? styles.tabs__activeTab : styles.tabs__tab,
          )}
          onClick={() => history.push('/payments/couriers')}
        >
          {t('couriers')}
        </p>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <p
          className={classNames(
            userType === 'restaurants' ? styles.tabs__activeTab : styles.tabs__tab,
          )}
          onClick={() => history.push('/payments/restaurants')}
        >
          {t('restaurants')}
        </p>
      </div>
      <Table
        // rowClick={selectPayment}
        columns={columns}
        data={
          userType === 'couriers'
            ? data.filter((item) => item.userType === 'Courier')
            : data.filter((item) => item.userType === 'Restaurant')
        }
      />
    </div>
  );
};

export default Payments;
