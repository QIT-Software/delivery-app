export default interface UpdateCuisineRequest {
  id: string;
  uploadFile: File | string | undefined;
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
