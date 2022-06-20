import Address from 'entities/Address';
import Cuisine from 'entities/Cuisine';
import User from 'entities/User';

export default interface Restaurant {
  id: string;
  user: User;
  image: string;
  title: string;
  description: string;
  address: Address;
  cuisines: Cuisine[];
}
