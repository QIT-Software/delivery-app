export default interface CreateAddressRequest {
  placeId?: string | undefined;
  description: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
  entrance?: string;
  floor?: string;
  apartment?: string;
}
