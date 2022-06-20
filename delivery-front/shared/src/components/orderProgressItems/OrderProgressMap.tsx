import React from 'react';
import styles from './OrderProgressMap.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {
  ClientMarker,
  CourierMarker,
  CourierLocation,
} from 'components/orderProgressItems/assets';
import {isClient, isCourier} from 'app/Config';
import LinearGradient from 'react-native-linear-gradient';
import Order from 'entities/Order';
import LatLng from 'entities/LatLng';
import {useTranslation} from 'react-i18next';
// import {useOrderProgressActions} from 'state/hooks/UseActions';

interface OrderProgressMapProps {
  mapPosition?: Region;
  courierLocation?: LatLng;
  items: Order[];
  setRef?: (ref: MapView | null) => void;
}

const OrderProgressMap: React.FC<OrderProgressMapProps> = ({
  setRef,
  mapPosition,
  items,
  courierLocation,
}) => {
  let mapRef: MapView | null;
  // const orderProgressActions = useOrderProgressActions();

  // console.log('THIS ORDER TEST', items);

  // useEffect(() => {
  //   if (items[0].courier) {
  //     setTimeout(orderProgressActions.fetchCourierLocation(items[0].courier?.id), 15000);
  //   }
  // });
  const {t} = useTranslation('map');

  const status = false;

  // const itemm = [
  //   {
  //     latitude: 25.199557,
  //     longitude: 55.278568,
  //   },
  //   {
  //     latitude: 25.195514,
  //     longitude: 55.253028,
  //   },
  //   {
  //     latitude: 25.213595,
  //     longitude: 55.28331,
  //   },
  // ];

  const courierIds = [
    ...new Map(items.map((item) => [item.courierId, item.courierId])).values(),
  ];

  const uniqueOrdersByCourierWithQuantity = courierIds.map((courierId) => {
    const ordersByCourier = items.filter((item) => courierId === item.courierId);

    const uniqueOrdersByCourier = [
      ...new Map(ordersByCourier.map((item) => [item.courierId, item])).values(),
    ];

    const uniqueOrdersByCourierWithQuantity = uniqueOrdersByCourier.map((uniqueOrder) => {
      const quantity = ordersByCourier.filter(
        (orderByCourier) => uniqueOrder.set.name === orderByCourier.set.name,
      ).length;

      return {order: uniqueOrder, quantity};
    });

    return {courierId, ordersData: uniqueOrdersByCourierWithQuantity};
  });

  return (
    <>
      {isClient() && (
        <MapView
          provider={PROVIDER_GOOGLE}
          // region={{longitude: 0.0, latitude: 0.0, longitudeDelta: 0.0, latitudeDelta: 0.0}}
          // 25.195514, 55.253028
          style={styles.map}
          loadingEnabled
          // mapType="terrain"
          initialRegion={{
            latitude: items[0].orderInfo.clientAddress.lat,
            longitude: items[0].orderInfo.clientAddress.lng,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          ref={(ref) => {
            mapRef = ref;
          }}
        >
          <Marker
            coordinate={{
              latitude: items[0].orderInfo.clientAddress.lat,
              longitude: items[0].orderInfo.clientAddress.lng,
            }}
            title={t('yourPosition')}
            image={ClientMarker}
            // style={styles.sa}
            onPress={() => {
              if (!mapRef) return;
              mapRef.animateToRegion(
                {
                  latitude: items[0].orderInfo.clientAddress.lat,
                  longitude: items[0].orderInfo.clientAddress.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
                500,
              );
            }}
          />
          {courierLocation &&
            uniqueOrdersByCourierWithQuantity.map((it) => (
              <Marker
                coordinate={{
                  latitude: courierLocation.lat,
                  longitude: courierLocation.lng,
                }}
                image={CourierMarker}
                // style={styles.sa}
                onPress={() => {
                  if (!mapRef) return;
                  mapRef.animateToRegion(
                    {
                      latitude: courierLocation.lat,
                      longitude: courierLocation.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                    500,
                  );
                }}
              >
                <Callout>
                  <View>
                    <View style={styles.bubbleContainer}>
                      {it.ordersData.map((orderData) => (
                        <Text style={styles.bubbleInner}>
                          {orderData.quantity} x {orderData.order.set.name}
                        </Text>
                      ))}
                    </View>
                    <View>
                      <TouchableOpacity>
                        {status ? (
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#FF8C29', '#FF2D55']}
                            style={styles.btn}
                          >
                            <Text style={styles.btnText}>{t('confirmOrder')}</Text>
                          </LinearGradient>
                        ) : (
                          <View style={styles.btnOff}>
                            <Text style={styles.btnText}>{t('confirmOrder')}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
      )}
      {isCourier() && (
        <MapView
          provider={PROVIDER_GOOGLE}
          // region={{longitude: 0.0, latitude: 0.0, longitudeDelta: 0.0, latitudeDelta: 0.0}}
          // 25.195514, 55.253028
          mapType="terrain"
          style={styles.map}
          loadingEnabled
          region={mapPosition}
          ref={setRef}
        >
          <Marker
            coordinate={{
              latitude: items[0].orderInfo.clientAddress.lat,
              longitude: items[0].orderInfo.clientAddress.lng,
            }}
            title={t('clientPosition')}
            // image={ClientMarker}
            // style={styles.sa}
            onPress={() => {
              if (!mapRef) return;
              mapRef.animateToRegion(
                {
                  latitude: items[0].orderInfo.clientAddress.lat,
                  longitude: items[0].orderInfo.clientAddress.lng,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0321,
                },
                500,
              );
            }}
          >
            <Image source={ClientMarker} style={styles.imgClient} />
          </Marker>
          {courierLocation && (
            <Marker
              coordinate={{
                latitude: courierLocation.lat,
                longitude: courierLocation.lng,
              }}
              // image={CourierLocation}
              // style={styles.sa}
              onPress={() => {
                if (!mapRef) return;
                mapRef.animateToRegion(
                  {
                    latitude: courierLocation.lat,
                    longitude: courierLocation.lng,
                    latitudeDelta: 0.1122,
                    longitudeDelta: 0.0521,
                  },
                  500,
                );
              }}
            >
              <Image source={CourierLocation} style={styles.img} />
            </Marker>
          )}
        </MapView>
      )}
    </>
  );
};

export default OrderProgressMap;
