import Cuisine from 'entities/Cuisine';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface CuisineDetailsContainer {
  cuisine: LoadableContainer<Cuisine>;
}
