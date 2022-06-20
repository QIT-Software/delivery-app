import React from 'react';
import {UserLocation} from 'state/entities/UserAddress';
import {SafeAreaView} from 'components/index';
import styles, {googlePlacesAutocompleteStyles} from './AddressDropMenu.styles';
import {KeyboardAvoidingView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTranslation} from 'react-i18next';
import {ConfigService} from 'services';
import {useAddressActions} from 'state/hooks/UseActions';

// export interface AddressProps {
//   confirmAction: NavigateToAddressDropMenuSubmitAction;
// }

type Data = {description: string; place_id: string};
type Details = {geometry: {location: {lat: number; lng: number}}};

interface AddressProps {
  onClick: () => void;
}

const AddressDropMenu: React.FC<AddressProps> = ({onClick}) => {
  const {t} = useTranslation('cuisinesList');

  const actions = useAddressActions();

  const onPress = (data: Data, details: Details) => {
    const location: UserLocation = {
      placeId: data.place_id,
      description: data.description,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
    };
    actions.chooseAddress(location);
    // eslint-disable-next-line no-console
    console.log(location);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder={t('search')}
          minLength={1}
          listUnderlayColor="#FFFFFF"
          autoFocus
          returnKeyType="search"
          listViewDisplayed="auto"
          fetchDetails
          renderDescription={(row: Data) => row.description}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            onClick();
            if (details) {
              onPress(data, details);
            }
          }}
          getDefaultValue={() => ''}
          query={{
            key: ConfigService.get('REACT_APP_GOOGLE_PLACES_KEY'),
            language: 'en',
            types: 'address',
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          styles={googlePlacesAutocompleteStyles}
          predefinedPlacesAlwaysVisible
          fetchDetail
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'geometry/location',
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default AddressDropMenu;
