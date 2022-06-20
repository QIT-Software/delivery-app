import Dish from 'entities/Dish';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface DishDetailsContainer {
  dish: LoadableContainer<Dish>;
}
