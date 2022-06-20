import Status from 'entities/Status';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface StatusDetailsContainer {
  status: LoadableContainer<Status>;
}
