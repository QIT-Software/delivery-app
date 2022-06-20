import {LatLng} from 'api/graphql/types';

export default interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address?: {
    placeId: string | undefined;
    latLng: LatLng;
    description: string;
  };
}
