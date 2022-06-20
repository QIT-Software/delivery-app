import React, {useEffect} from 'react';
import {OrderProgressIndicator, RequireLoadable} from 'components';
import OrderProgressMap from 'components/orderProgressItems/OrderProgressMap';
import OrderProgressLayout from 'components/orderProgressItems/OrderProgressLayout';
import OrderProgressLayoutState from 'components/orderProgressItems/OrderProgressLayoutState';
import {useSelector} from 'state/client/hooks';
import {useSelector as useCourierSelector} from 'state/courier/hooks';
import State from 'state/courier/entities/State';
import {useCourierOrdersActions} from 'state/courier/hooks/UseActions';

const OrderProgress: React.FC = () => {
  const actions = useCourierOrdersActions();

  useEffect(() => {
    actions.fetchCourierOrders();
    actions.requestCurrentPosition();
  }, []);

  const orders = useCourierSelector((state: State) => state);

  const {location} = useSelector((state) => state);

  const orderProgressMap = () => {
    return (
      <RequireLoadable data={orders.courierOrdersList}>
        {({courierOrdersList}) => (
          <>
            {location.location && (
              <OrderProgressMap
                items={courierOrdersList}
                courierLocation={location.location}
                // setRef={setRef}
                mapPosition={{
                  latitude: location.location?.lat,
                  longitude: location.location?.lng,
                  latitudeDelta: 0.0422,
                  longitudeDelta: 0.0221,
                }}
              />
            )}
          </>
        )}
      </RequireLoadable>
    );
  };

  const renderStubState = (): OrderProgressLayoutState => ({
    title: 'Test',
    background: orderProgressMap(),
    progress: (
      <RequireLoadable data={orders.courierOrdersList}>
        {({courierOrdersList}) => (
          <>
            <OrderProgressIndicator
              addressFrom={courierOrdersList[0].restaurant.address.description}
              addressTo={courierOrdersList[0].orderInfo.clientAddress}
            />
          </>
        )}
      </RequireLoadable>
    ),
  });

  const getState = (): OrderProgressLayoutState => {
    return renderStubState();
  };

  return <OrderProgressLayout>{getState()}</OrderProgressLayout>;
};

export default OrderProgress;
