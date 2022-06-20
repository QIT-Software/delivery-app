import {ID} from './Common';
import User from 'entities/User';
import {DocumentsRevision} from 'entities/Documents';

export default interface Courier {
  id: ID;
  user: User;
  revision: DocumentsRevision | undefined;
}
