import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useClientDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from './ClientDetails.module.scss';
import {Loader} from 'components';
import {format} from 'date-fns';
import Client from 'entities/Client';
import {useTranslation} from 'react-i18next';
import Order from 'entities/Order';

const editProfileIcon = require('./assets/editProfile.svg');

const ClientDetails: React.FC = () => {
  const {t} = useTranslation('customer');
  const {clientId} = useParams<{clientId: string}>();
  const actions = useClientDetailsActions();
  const {client} = useSelector((state) => state.clientDetails);

  const history = useHistory();

  const [isEditing, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const openEditUserInformationPage = (client: Client) => {
    setEdit(true);
    setName(client.user.name);
    setPhoneNumber(
      client.user.additionalInfo ? client.user.additionalInfo?.phoneNumber : '',
    );
    setEmail(client.user.additionalInfo ? client.user.additionalInfo?.email : '');
    history.push(`/customers/${clientId}/editProfile`);
  };

  const cancelEditingUserInformation = () => {
    setEdit(false);
    history.push(`/customers/${clientId}`);
  };

  const updateUserInformation = () => {
    actions.updateClientInformation({
      id: clientId,
      name,
      email,
      phoneNumber,
    });
    setEdit(false);
    history.push(`/customers/${clientId}`);
  };

  useEffect(() => {
    actions.fetchClientDetails(clientId);
  }, []);

  const orderActions = useOrderActions();

  useEffect(() => {
    orderActions.fetchOrders();
  }, []);

  const data = useSelector((state) => state.orders);

  const renderOrdersList = (orders: Order[]) => {
    const selectOrder = (order: Order) => {
      if (order.id) {
        orderActions.selectOrder(order.id);
      }
    };

    return (
      <ul className={styles.orders__list}>
        <li className={styles.orders__listItem__header} key="header">
          <p>{t('created')}</p>
          <p>{t('weight')}</p>
          <p>{t('price')}</p>
        </li>
        {orders.map((order) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
          <li
            className={styles.orders__listItem}
            key={order.id}
            onClick={() => selectOrder(order)}
          >
            <p>{format(new Date(order.created), 'MM.dd.yyyy')}</p>
            <p>${(order.orderInfo.priceCents / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    );
  };

  const customerOrders =
    data.isSuccess &&
    client.isSuccess &&
    client.user &&
    data.orders.filter((order) => order.client.id === client.user.id);

  const renderMainInfo = (client: Client) => (
    <Grid className={styles.mainInfoContainer}>
      <Grid className={styles.user} item>
        <p className={styles.user__name}>{client.user.name}</p>
        <p className={styles.user__position}>{t('customer')}</p>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>{t('orders')}</p>

      {data &&
        data.isSuccess &&
        customerOrders &&
        (customerOrders.length > 0 ? (
          renderOrdersList(customerOrders)
        ) : (
          <p className={styles.orders__ordersAbsentMessage}>{t('noOrders')}</p>
        ))}
    </Grid>
  );

  const renderExtraInfo = (client: Client) => (
    <div className={styles.extraInfo}>
      <div className={styles.extraInfo__header}>
        <p className={styles.extraInfo__title}>{t('profileDetails')}</p>
        {isEditing ? (
          <>
            <div className={styles.extraInfo__editProfile}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p onClick={() => updateUserInformation()}>{t('save')}</p>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p onClick={() => cancelEditingUserInformation()}>{t('cancel')}</p>
            </div>
          </>
        ) : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={styles.extraInfo__editProfile}
            onClick={() => openEditUserInformationPage(client)}
          >
            <img src={editProfileIcon} alt={t('editProfile')} />
            <p>{t('editProfile')}</p>
          </div>
        )}
      </div>
      <div className={styles.extraInfo__details}>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('fullName')}:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>{client.user.name}</p>
            )}
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('mobilePhone')}:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {client.user.additionalInfo
                  ? client.user.additionalInfo?.phoneNumber
                  : '-'}
              </p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('emailAddress')}:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {client.user.additionalInfo ? client.user.additionalInfo?.email : '-'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.infoContainer}>
        {client.isSuccess ? renderMainInfo(client) : <Loader />}
        {client.isSuccess ? renderExtraInfo(client) : <Loader />}
      </div>
      <div className={styles.infoContainer}>
        {client.isSuccess ? renderOrders() : <Loader />}
      </div>
    </div>
  );
};

export default ClientDetails;
