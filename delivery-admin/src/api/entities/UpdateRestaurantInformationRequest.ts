export default interface UpdateRestaurantInformationRequest {
  id: string;
  image: string;
  name: string;
  email: string;
  phoneNumber: string;
  placeId: string;
  lat: number;
  lng: number;
  addressDescription: string;
  title: string;
  restaurantDescription: string;
  cuisines: string[];
}
