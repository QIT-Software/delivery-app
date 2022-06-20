export default interface CreateRestaurantRequest {
  uploadFile: File | string | undefined;
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
