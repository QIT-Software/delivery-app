import Courier from 'entities/Courier';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {DocumentsGroups} from 'entities/Documents';

export interface CourierDetailsContainer {
  courier: LoadableContainer<Courier>;
  groups: DocumentsGroups | undefined;
}
