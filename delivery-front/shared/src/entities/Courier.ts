import {ID} from './Common';
import User from 'entities/User';

export default interface Courier {
  id: ID;
  user: User;
}
