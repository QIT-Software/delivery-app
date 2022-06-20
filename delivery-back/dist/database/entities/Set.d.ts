import File from 'database/entities/File';
import Cuisine from 'database/entities/Cuisine';
import Dish from 'database/entities/Dish';
import Status from 'database/entities/Status';
export default class Set {
    constructor(id: string, name: string, image: File, imageId: string, cuisine: Cuisine, cuisineId: string, priceCents: number, dishes: Dish[], status: Status[], day: string, isFavorite: boolean);
    id: string;
    name: string;
    image?: File;
    imageId: string;
    cuisine?: Cuisine;
    cuisineId: string;
    priceCents: number;
    dishes?: Dish[];
    statuses?: Status[];
    day: string;
    isFavorite: boolean;
}
