import File from 'database/entities/File';
export default class Cuisine {
    constructor(id: string, image: File, imageId: string, nationality: string, rating: string);
    id: string;
    image?: File;
    imageId: string;
    nationality: string;
    rating: string;
}
