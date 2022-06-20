import React, {useEffect} from 'react';
import {useRestaurantActions} from 'state/hooks/UseActions';
import styles from 'routes/restaurants/Restaurants.module.scss';
import {useSelector} from 'state/hooks';
import Table from 'components/Table/Table';
import Restaurant from 'entities/Restaurant';
import {useHistory, Link} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';

const Restaurants: React.FC = () => {
  const {t} = useTranslation('restaurant');
  const history = useHistory();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const restaurantActions = useRestaurantActions();

  const columns = React.useMemo(
    () => [
      {
        Header: t('title'),
        accessor: 'title',
      },
      {
        Header: t('contactPerson'),
        accessor: 'user.name',
      },
      {
        Header: t('address'),
        accessor: 'address.description',
      },
    ],
    [],
  );

  useEffect(() => {
    restaurantActions.fetchRestaurants();
  }, []);

  // TODO: IMPLEMENT BETTER SOLUTION WITH TYPES
  const selectRestaurant = (restaurant: Restaurant) => {
    if (restaurant.id) {
      restaurantActions.selectRestaurant(restaurant.id);
    }
  };

  const data = useSelector((state) => state.restaurants);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link to="/restaurants/create" className={styles.createRestaurantButton}>
          {t('createRestaurant')}
        </Link>
      </div>
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        rowClick={selectRestaurant}
        columns={columns}
        data={data.isSuccess ? data.restaurants : []}
      />
    </div>
  );
};

export default Restaurants;
