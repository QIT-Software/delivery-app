export default class RestaurantUpdateRequest {
    constructor(userId: string, imageId: string, address: string, description: string, title: string);
    userId: string;
    imageId: string;
    address: string;
    title: string;
    description: string;
}
