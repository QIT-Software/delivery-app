import React, {ChangeEvent, useEffect, useState} from 'react';
import {
  useCuisineActions,
  useOrderActions,
  useRestaurantDetailsActions,
} from 'state/hooks/UseActions';
import styles from 'routes/restaurants/details/RestaurantDetails.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {Field, Form, Formik} from 'formik';
import {Loader, TextField} from 'components';
import {useTranslation} from 'react-i18next';
import {DropzoneArea} from 'material-ui-dropzone';
import {Logo} from 'assets';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import Order from '../../../entities/Order';
import {format} from 'date-fns';
import {Grid} from '@material-ui/core';
import Restaurant from '../../../entities/Restaurant';
import Cuisine from '../../../entities/Cuisine';
import {ConfigService} from '../../../services';

interface RestaurantDetailsFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  title: string;
  restaurantDescription: string;
}

const RestaurantDetails: React.FC = () => {
  const actions = useRestaurantDetailsActions();
  const orderActions = useOrderActions();
  const cuisineActions = useCuisineActions();

  const history = useHistory();
  const {t} = useTranslation('restaurant');

  const [file, setFile] = useState<File>();
  const [showPreview, setShowPreview] = useState(false);
  const [addressDescription, setAddressDescription] = useState<string>('');
  const [placeId, setPlaceId] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [selectedCuisines, setCuisines] = useState<string[]>([]);
  const [isShowCuisines, setShowCuisines] = useState(false);
  const [password, setPassword] = useState<string>();
  const [isError, setError] = useState(false);
  const [isReady, setReady] = useState(true);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const {restaurantId} = useParams<{restaurantId: string | undefined}>();

  const {cuisines} = useSelector((state) => state);
  const {restaurant} = useSelector((state) => state.restaurantDetails);

  useEffect(() => {
    orderActions.fetchOrders();
    cuisineActions.fetchCuisines();
  }, []);

  useEffect(() => {
    if (restaurant.isSuccess) {
      setCuisines(restaurant.cuisines.map((cuisine) => cuisine.id));
      setAddressDescription(restaurant.address.description);
      setPlaceId(restaurant.address.palaceId ? restaurant.address.palaceId : '');
      setLat(restaurant.address.lat);
      setLng(restaurant.address.lng);
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurantId) actions.fetchRestaurantDetails(restaurantId);
  }, [restaurantId]);

  const initialValues: RestaurantDetailsFormValues =
    restaurantId && restaurant.isSuccess && restaurant.user
      ? {
          name: restaurant.user.name,
          email: restaurant.user.additionalInfo
            ? restaurant.user.additionalInfo.email
            : '',
          phoneNumber: restaurant.user.additionalInfo
            ? restaurant.user.additionalInfo.phoneNumber
            : '',
          title: restaurant.title,
          restaurantDescription: restaurant.description,
        }
      : {
          name: '',
          email: '',
          phoneNumber: '',
          title: '',
          restaurantDescription: '',
        };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: RestaurantDetailsFormValues) => {
    setError(false);
    setReady(true);

    if (restaurantId === undefined) {
      if (
        file &&
        values.name &&
        values.email &&
        values.phoneNumber &&
        password &&
        values.restaurantDescription &&
        values.title
      ) {
        setShowPreview(false);
        return actions.createRestaurant({
          ...values,
          uploadFile: file,
          addressDescription,
          lat,
          lng,
          placeId,
          cuisines: selectedCuisines,
          password,
        });
      }
      setReady(false);
      setError(true);
    }

    if (
      restaurantId &&
      values.name &&
      values.email &&
      values.phoneNumber &&
      values.restaurantDescription &&
      values.title &&
      restaurant.isSuccess
    ) {
      setShowPreview(false);
      return actions.updateRestaurantInformation({
        id: restaurantId,
        ...values,
        uploadFile: file || restaurant.image,
        addressDescription,
        lat,
        lng,
        placeId,
        cuisines: selectedCuisines,
      });
    }
  };

  const data = useSelector((state) => state.orders);

  const renderOrdersList = (orders: Order[]) => {
    const selectOrder = (order: Order) => {
      if (order.id) {
        orderActions.selectOrder(order.id);
      }
    };

    const countPrice = (order: Order) => {
      const courierPrice = order.orderInfo.priceCents / 100;

      return courierPrice.toFixed(2);
    };

    return (
      <ul className={styles.orders__list}>
        <li className={styles.orders__listItem__header} key="header">
          <p>{t('created')}</p>
          <p>{t('weight')}</p>
          <p>{t('price')}</p>
        </li>
        {orders.map((order) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={styles.orders__listItem}
            key={order.id}
            onClick={() => selectOrder(order)}
          >
            <p>{format(new Date(order.created), 'MM.dd.yyyy')}</p>
            <p>{`$${countPrice(order)}`}</p>
          </li>
        ))}
      </ul>
    );
  };

  const restaurantOrders =
    data.isSuccess &&
    restaurant.isSuccess &&
    data.orders.filter((order) => order.restaurant.id === restaurant.id);

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>{t('orders')}</p>

      {data &&
        data.isSuccess &&
        restaurantOrders &&
        (restaurantOrders.length > 0 ? (
          renderOrdersList(restaurantOrders)
        ) : (
          <p className={styles.orders__ordersAbsentMessage}>{t('noOrders')}</p>
        ))}
    </Grid>
  );

  const renderEditor = (restaurant: Restaurant | undefined, cuisines: Cuisine[]) => {
    return (
      <div className={styles.editorContainer}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values, formActions) => {
            save(values);
            formActions.setSubmitting(false);
          }}
        >
          <Form className={styles.form}>
            <div className={styles.dropdownContainer}>
              {restaurantId && restaurant ? (
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <img
                      className={styles.image}
                      src={restaurant.image}
                      alt={t('restaurant')}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.image} src={Logo} alt={t('restaurant')} />
                  </div>
                </div>
              )}
              <DropzoneArea
                filesLimit={1}
                onChange={(files: File[]) => {
                  setFile(files[0]);
                  setShowPreview(true);
                }}
                initialFiles={[]}
                showPreviewsInDropzone={showPreview}
              />
            </div>
            <h3 className={styles.formSubTitle}>{t('user')}</h3>
            <Field
              variant="outlined"
              fullWidth
              margin="normal"
              id="name"
              name="name"
              type="name"
              as={TextField}
              label={t('name')}
              className={styles.form__field}
            />
            <Field
              variant="outlined"
              fullWidth
              margin="normal"
              id="email"
              name="email"
              type="email"
              as={TextField}
              label={t('email')}
              className={styles.form__field}
            />
            <Field
              variant="outlined"
              fullWidth
              margin="normal"
              id="phoneNumber"
              name="phoneNumber"
              type="phoneNumber"
              as={TextField}
              label={t('phoneNumber')}
              className={styles.form__field}
            />
            {!restaurantId && (
              <Field
                variant="outlined"
                fullWidth
                margin="normal"
                id="password"
                name="password"
                type="password"
                as={TextField}
                label={t('password')}
                className={styles.form__field}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            )}
            <h3 className={styles.formSubTitle}>{t('restaurant')}</h3>
            <Field
              variant="outlined"
              fullWidth
              margin="normal"
              id="title"
              name="title"
              type="title"
              as={TextField}
              label={t('title')}
              className={styles.form__field}
            />
            <Field
              variant="outlined"
              fullWidth
              margin="normal"
              id="restaurantDescription"
              name="restaurantDescription"
              type="restaurantDescription"
              as={TextField}
              label={t('description')}
              className={styles.form__field}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="cuisines"
              label={t('cuisines')}
              type="cuisines"
              id="cuisines"
              as={TextField}
              className={styles.form__field}
              onClick={() => setShowCuisines(!isShowCuisines)}
              onChange={setCuisines}
              value={cuisines
                .filter((cuisine) => selectedCuisines.includes(cuisine.id))
                .map((item) => item.nationality)
                .join(', ')}
            />
            {isShowCuisines && (
              <ul className={styles.selectList}>
                {cuisines.map((item) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                  <li
                    onClick={() => {
                      const indexInArray = selectedCuisines.indexOf(item.id);

                      if (indexInArray === -1) {
                        setCuisines([...selectedCuisines, item.id]);
                      } else {
                        setCuisines([
                          ...selectedCuisines.filter(
                            (item, index) => index !== indexInArray,
                          ),
                        ]);
                      }
                    }}
                    className={
                      selectedCuisines.includes(item.id)
                        ? styles.selectList__selectedItem
                        : styles.selectList__item
                    }
                  >
                    {item.nationality}
                  </li>
                ))}
              </ul>
            )}
            <GooglePlacesAutocomplete
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSelect={(value: any) => {
                setAddressDescription(value.description);
                geocodeByAddress(value.description)
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .then((results: any) => {
                    setPlaceId(results[0].placeId);
                    return getLatLng(results[0]);
                  })
                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                  // @ts-ignore
                  .then(({lat, lng}) => {
                    setLat(lat);
                    setLng(lng);
                  });
              }}
              initialValue={
                addressDescription ||
                (restaurant && restaurant.address ? restaurant.address.description : '')
              }
              inputClassName={styles.autocompleteField}
              apiKey={ConfigService.get('REACT_APP_GOOGLE_PLACES_KEY')}
            />
            <div className={styles.buttons}>
              {restaurantId && (
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => actions.deleteRestaurant(restaurantId)}
                >
                  {t('delete')}
                </button>
              )}
              <button className={styles.saveButton} type="submit">
                {t('save')}
              </button>
            </div>
            {isError && (
              <div className={styles.errorMessages}>
                {!isReady && <p>{t('filledFields')}</p>}
              </div>
            )}
          </Form>
        </Formik>
      </div>
    );
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.container}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {restaurantId ? (
          restaurant.isSuccess && cuisines.isSuccess ? (
            renderEditor(restaurant, cuisines.cuisines)
          ) : (
            <Loader />
          )
        ) : cuisines.isSuccess ? (
          renderEditor(undefined, cuisines.cuisines)
        ) : (
          <Loader />
        )}

        <div className={styles.infoContainer}>
          {restaurantId && (restaurant.isSuccess ? renderOrders() : <Loader />)}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
