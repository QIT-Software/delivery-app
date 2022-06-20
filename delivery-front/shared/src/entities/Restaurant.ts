import Address from 'entities/Address';
import Cuisine from 'entities/Cuisine';

export default interface Restaurant {
  id: string;
  userId: string;
  imageId: string;
  description: string;
  address: Address;
  cuisines: Cuisine[];
}
