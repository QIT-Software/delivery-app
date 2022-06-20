import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useCourierDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from 'routes/couriers/details/CourierDetails.module.scss';
import {Loader} from 'components';
import {format} from 'date-fns';
import Courier from 'entities/Courier';
import {useTranslation} from 'react-i18next';
import Order from 'entities/Order';
import {
  DocumentsGroup,
  DocumentsGroups,
  DocumentsRevision,
  DocumentsRevisionStatus,
  EvaluateDocumentsRevisionType,
} from 'entities/Documents';
import classNames from 'classnames';

const editProfileIcon = require('./assets/editProfile.svg');

const CourierDetails: React.FC = () => {
  const {t} = useTranslation('courier');
  const {courierId} = useParams<{courierId: string}>();
  const actions = useCourierDetailsActions();
  const {courier, groups} = useSelector((state) => state.courierDetails);

  const history = useHistory();

  const [isEditing, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState('');

  const updateStatus = (type: EvaluateDocumentsRevisionType, comment: string) => {
    if (courier.isSuccess && courier.revision) {
      actions.evaluateDocumentsRevision(courier.id, type, comment);
    }
  };

  const openEditUserInformationPage = (courier: Courier) => {
    setEdit(true);
    setName(courier.user.name);
    setPhoneNumber(
      courier.user.additionalInfo ? courier.user.additionalInfo?.phoneNumber : '',
    );
    setEmail(courier.user.additionalInfo ? courier.user.additionalInfo?.email : '');
    history.push(`/couriers/${courierId}/editProfile`);
  };

  const cancelEditingUserInformation = () => {
    setEdit(false);
    history.push(`/couriers/${courierId}`);
  };

  const updateUserInformation = () => {
    actions.updateCourierInformation({
      id: courierId,
      name,
      email,
      phoneNumber,
    });
    setEdit(false);
    history.push(`/couriers/${courierId}`);
  };

  useEffect(() => {
    actions.fetchCourierDetails(courierId);
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

  const courierOrders =
    data.isSuccess &&
    courier.isSuccess &&
    courier.user &&
    data.orders.filter((order) => order.courierId === courier.user.id);

  const renderMainInfo = (courier: Courier) => (
    <Grid className={styles.mainInfoContainer}>
      <Grid className={styles.user} item>
        <div className={styles.user__nameAndStatus}>
          <p className={styles.user__name}>{courier.user.name}</p>
        </div>
        <p className={styles.user__position}>{t('courier')}</p>
        <p className={styles.user__status}>
          {t('status')}:{' '}
          <span
            className={classNames(
              courier.revision && {
                [styles.New]: courier.revision.status === DocumentsRevisionStatus.New,
                [styles.Approved]:
                  courier.revision.status === DocumentsRevisionStatus.Approved,
                [styles.Verifying]:
                  courier.revision.status ===
                  DocumentsRevisionStatus.VerificationRequested,
                [styles.Reject]:
                  courier.revision.status === DocumentsRevisionStatus.Rejected,
              },
            )}
          >
            {courier.revision ? courier.revision.status : 'New'}
          </span>
        </p>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>{t('orders')}</p>

      {data &&
        data.isSuccess &&
        courierOrders &&
        (courierOrders.length > 0 ? (
          renderOrdersList(courierOrders)
        ) : (
          <p className={styles.orders__ordersAbsentMessage}>{t('noOrders')}</p>
        ))}
    </Grid>
  );

  const renderExtraInfo = (courier: Courier) => (
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
            onClick={() => openEditUserInformationPage(courier)}
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
              <p className={styles.extraInfo__field__value}>{courier.user.name}</p>
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
                {courier.user.additionalInfo
                  ? courier.user.additionalInfo?.phoneNumber
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
                {courier.user.additionalInfo ? courier.user.additionalInfo?.email : '-'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // const renderDocument = () => {
  //   return (
  //     <div className={styles.courierDocument}>
  //       <p className={styles.orders__title}>{t('courierDocument')}</p>
  //       <img src={Passport} alt="" />
  //       <div>
  //         <button type="button" onClick={() => setIsNew(false)}>
  //           {t('approve')}
  //         </button>
  //         <button type="button">{t('decline')}</button>
  //       </div>
  //     </div>
  //   );
  // };

  const renderFooter = (revision: DocumentsRevision) => {
    return (
      <div className={styles.detailsContainer__paper__footer}>
        <div className={styles.buttonContainer}>
          {revision.status !== DocumentsRevisionStatus.New ? (
            <>
              <input
                placeholder="Comments"
                value={comment}
                className={styles.commentField}
                onChange={(event) => setComment(event.target.value)}
              />
              <div>
                <button
                  className={styles.buttonAcceptCourier}
                  onClick={() => {
                    return updateStatus(EvaluateDocumentsRevisionType.Approve, comment);
                  }}
                  type="submit"
                >
                  {t('accept')}
                </button>
                <button
                  className={styles.buttonDeclineCourier}
                  onClick={() => {
                    return updateStatus(EvaluateDocumentsRevisionType.Reject, comment);
                  }}
                  type="submit"
                >
                  {t('decline')}
                </button>
              </div>
            </>
          ) : (
            <span>{t('waitVerificationCourier')}</span>
          )}
        </div>
      </div>
    );
  };

  const renderDocumentsGroup = (
    groups: DocumentsGroups,
    title: string,
    group: DocumentsGroup,
  ) => {
    return (
      <div>
        <h2 className={styles.documentName}>{title}</h2>
        <div className={styles.documentsImagesContainer}>
          {groups[group].map((document) => (
            <div className={styles.documentImageContainer}>
              <img
                key={document.id}
                className={styles.detailsContainer__paper__documentImage}
                src={document.image}
                alt="document"
              />
            </div>
          ))}
          {groups[group].length === 0 && (
            <>
              <div className={styles.defaultImage} />
              <div className={styles.defaultImage} />
            </>
          )}
          {groups[group].length === 1 && <div className={styles.defaultImage} />}
        </div>
      </div>
    );
  };

  const renderDocuments = (courier: Courier) => {
    return (
      <Grid className={styles.detailsContainer__paper__info}>
        <div className={styles.documents}>
          <div className={styles.extraInfo__header}>
            <p className={styles.extraInfo__title}>{t('courierDocuments')}</p>
          </div>
        </div>
        {groups && (
          <div className={styles.documentsList}>
            <div className={styles.documentsGroupsList}>
              {renderDocumentsGroup(groups, t('W4'), 'w4')}
              {renderDocumentsGroup(groups, t('carInsurance'), 'carInsurance')}
              {renderDocumentsGroup(groups, t('driversLicense'), 'driversLicense')}
            </div>
            <div className={styles.documentsGroupsList}>
              {renderDocumentsGroup(groups, t('licensePlate'), 'licensePlate')}
              {renderDocumentsGroup(groups, t('carRegistration'), 'carRegistration')}
            </div>
          </div>
        )}
        {courier.revision && renderFooter(courier.revision)}
      </Grid>
    );
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.infoContainer}>
        {courier.isSuccess ? renderMainInfo(courier) : <Loader />}
        {courier.isSuccess ? renderExtraInfo(courier) : <Loader />}
        {courier.isSuccess ? renderDocuments(courier) : <Loader />}
      </div>
      <div className={styles.infoContainer}>
        {courier.isSuccess ? renderOrders() : <Loader />}
      </div>
    </div>
  );
};

export default CourierDetails;
