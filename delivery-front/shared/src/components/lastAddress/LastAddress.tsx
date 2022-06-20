import React from 'react';

import styles from './LastAddress.styles';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import Address from 'entities/Address';
import {useAddressActions, useRouterActions} from 'state/client/hooks/UseActions';
import {UserLocation} from 'state/entities/UserAddress';

interface LastAddressProps extends ViewProps {
  address: Address;
  onPress?: () => void;
}

const LastAddress: React.FC<LastAddressProps> = ({address}) => {
  const routerActions = useRouterActions();
  const addressActions = useAddressActions();

  const onPress = () => {
    const location: UserLocation = {
      placeId: address.palaceId,
      description: address.description,
      entrance: address.entrance,
      floor: address.floor,
      apartment: address.apartment,
      lat: address.lat,
      lng: address.lng,
    };
    addressActions.chooseAddress(location);
    // eslint-disable-next-line no-console
  };
  const {description} = address;
  const entrance = address.entrance && `, entrance ${address.entrance}`;
  const floor = address.floor && `, floor ${address.floor}`;
  const apartment = address.apartment && `, apartment ${address.apartment}`;
  // const locationDelivery = `${description}${entrance}${floor}${apartment}`;
  return (
    <View style={styles.addressContainer}>
      <TouchableOpacity
        onPress={() => {
          onPress();
          routerActions.navigateToOrder();
        }}
      >
        <View>
          <Text style={styles.addressText}>
            {description}
            {address.entrance && entrance}
            {address.floor && floor}
            {address.apartment && apartment}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LastAddress;
