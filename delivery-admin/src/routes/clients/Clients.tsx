import React, {useEffect} from 'react';
import {useClientActions} from 'state/hooks/UseActions';
import styles from './Clients.module.scss';
import {useSelector} from 'state/hooks';
import Table from 'components/Table/Table';
import Client from 'entities/Client';
import {useHistory} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';

const Clients: React.FC = () => {
  const {t} = useTranslation('customer');
  const history = useHistory();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const clientActions = useClientActions();

  const columns = React.useMemo(
    () => [
      {
        Header: t('name'),
        accessor: 'user.name',
      },
      {
        Header: t('phone'),
        accessor: 'user.additionalInfo.phoneNumber',
      },
      {
        Header: t('email'),
        accessor: 'user.additionalInfo.email',
      },
    ],
    [],
  );

  useEffect(() => {
    clientActions.fetchClients();
  }, []);

  // TODO: IMPLEMENT BETTER SOLUTION WITH TYPES
  const selectClient = (client: Client) => {
    if (client.id) {
      clientActions.selectClient(client.id);
    }
  };

  const data = useSelector((state) => state.clients);

  return (
    <div className={styles.container}>
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        rowClick={selectClient}
        columns={columns}
        data={data.isSuccess ? data.clients : []}
      />
    </div>
  );
};

export default Clients;
