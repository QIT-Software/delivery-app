import {LoadableContainer} from './LoadableContainer';
import {Session} from 'entities/Session';

export type SessionContainer =
  | {
      exists: false;
    }
  | ({
      exists: true;
    } & LoadableContainer<Session>);
