import Restaurant from 'entities/Restaurant';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface RestaurantDetailsContainer {
  restaurant: LoadableContainer<Restaurant>;
}
