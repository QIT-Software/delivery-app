import Status from 'entities/Status';
import Dish from 'entities/Dish';

export default interface Set {
  id: string;
  name: string;
  imageId: string;
  priceCents: number;
  cuisineId: string;
  statuses: Status[];
  dishes: Dish[];
  day: string;
  isFavorite: boolean;
}
