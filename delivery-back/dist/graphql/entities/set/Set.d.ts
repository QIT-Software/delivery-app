import Dish from 'graphql/entities/dish/Dish';
import Status from 'graphql/entities/status/Status';
export default class Set {
    constructor(id: string, name: string, imageId: string, cuisineId: string, priceCents: number, dishes: Dish[], statuses: Status[], day: string | undefined, isFavorite: boolean | undefined);
    id: string;
    name: string;
    imageId: string;
    cuisineId: string;
    priceCents: number;
    dishes: Dish[];
    statuses: Status[];
    day: string | undefined;
    isFavorite: boolean | undefined;
}
