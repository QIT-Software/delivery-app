import File from 'database/entities/File';
export default class Status {
    constructor(id: string, name: string, image: File, imageId: string);
    id: string;
    name: string;
    image?: File;
    imageId: string;
}
