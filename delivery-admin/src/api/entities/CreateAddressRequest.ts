import LatLng from 'entities/LatLng';

export default interface CreateAddressRequest {
  description: string;
  latLng: LatLng;
}
