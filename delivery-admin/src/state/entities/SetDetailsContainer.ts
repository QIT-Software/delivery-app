import Set from 'entities/Set';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface SetDetailsContainer {
  set: LoadableContainer<Set>;
}
