export default interface CreateRestaurantInformationRequest {
  image: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  placeId: string;
  lat: number;
  lng: number;
  addressDescription: string;
  title: string;
  restaurantDescription: string;
  cuisines: string[];
}
