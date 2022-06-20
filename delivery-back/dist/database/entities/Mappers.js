"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAdminsFromDb = exports.mapAdminFromDb = exports.mapAccountFromDB = exports.mapPreferencesFromDb = exports.mapEmailForSpamListFromDb = exports.mapEmailForSpamFromDB = exports.mapOrderListFromDb = exports.mapOrderFromDb = exports.mapOrderInfoFromDb = exports.mapCouriersFromDb = exports.mapCourierFromDb = exports.mapDocumentRevisionFromDb = exports.mapDocumentsFromDb = exports.mapDocumentFromDb = exports.mapClientsFromDb = exports.mapClientFromDb = exports.mapRestaurantsFromDb = exports.mapRestaurantFromDb = exports.mapUserFromDb = exports.mapAdditionalUserInfoFromDb = exports.mapAddressesFromDB = exports.mapAddressFromDB = exports.mapCuisinesFromDb = exports.mapCuisineFromDb = exports.mapSetsFromDb = exports.mapSetFromDb = exports.mapStatusesFromDb = exports.mapStatusFromDb = exports.mapDishesFromDb = exports.mapDishFromDb = exports.mapIngredientsFromDb = exports.mapIngredientFromDb = exports.mapBagsFromDb = exports.mapCartFromDb = exports.mapBagFromDb = exports.mapLatLngFromDb = void 0;
const Address_1 = __importDefault(require("./Address"));
const Address_2 = __importDefault(require("../../entities/Address"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const Ingredient_1 = __importDefault(require("../../entities/Ingredient"));
const Status_1 = __importDefault(require("../../entities/Status"));
const Dish_1 = __importDefault(require("../../entities/Dish"));
const Preferences_1 = __importDefault(require("../../entities/Preferences"));
const Set_1 = __importDefault(require("../../entities/Set"));
const Cuisine_1 = __importDefault(require("../../entities/Cuisine"));
const Restaurant_1 = __importDefault(require("../../entities/Restaurant"));
const Client_1 = __importDefault(require("../../entities/Client"));
const Courier_1 = __importDefault(require("../../entities/Courier"));
const Bag_1 = __importDefault(require("../../entities/Bag"));
const Cart_1 = __importDefault(require("../../entities/Cart"));
const Document_1 = require("../../entities/Document");
const AdditionalUserInfo_1 = __importDefault(require("../../entities/AdditionalUserInfo"));
const LatLng_1 = __importDefault(require("../../entities/LatLng"));
exports.mapLatLngFromDb = (location) => ({
    lng: location.lng,
    lat: location.lat,
});
exports.mapBagFromDb = (bag) => {
    return {
        id: bag.id,
        code: bag.code,
    };
};
exports.mapCartFromDb = (cart) => {
    return {
        id: cart.id,
        userId: cart.userId,
        status: cart.status,
    };
};
exports.mapBagsFromDb = (bags) => {
    return bags.map(exports.mapBagFromDb);
};
exports.mapIngredientFromDb = (ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
});
exports.mapIngredientsFromDb = (ingredients) => {
    return ingredients.map(exports.mapIngredientFromDb);
};
exports.mapDishFromDb = (dish) => {
    if (!dish.ingredients)
        throw new SpoonError_1.default('Dish has no ingredients');
    return {
        id: dish.id,
        name: dish.name,
        description: dish.description,
        imageId: dish.imageId,
        weight: dish.weight,
        kal: dish.kal,
        ingredients: exports.mapIngredientsFromDb(dish.ingredients),
    };
};
exports.mapDishesFromDb = (dishes) => {
    return dishes.map(exports.mapDishFromDb);
};
exports.mapStatusFromDb = (status) => ({
    id: status.id,
    name: status.name,
    imageId: status.imageId,
});
exports.mapStatusesFromDb = (statuses) => {
    return statuses.map(exports.mapStatusFromDb);
};
exports.mapSetFromDb = (set) => {
    if (!set.dishes)
        throw new SpoonError_1.default('Set has no dishes');
    if (!set.statuses)
        throw new SpoonError_1.default('Set has no statuses');
    return {
        id: set.id,
        name: set.name,
        imageId: set.imageId,
        cuisineId: set.cuisineId,
        priceCents: set.priceCents,
        dishes: exports.mapDishesFromDb(set.dishes),
        statuses: exports.mapStatusesFromDb(set.statuses),
        day: set.day,
        isFavorite: set.isFavorite,
    };
};
exports.mapSetsFromDb = (sets) => {
    return sets.map(exports.mapSetFromDb);
};
exports.mapCuisineFromDb = (cuisine) => ({
    id: cuisine.id,
    imageId: cuisine.imageId,
    nationality: cuisine.nationality,
    rating: cuisine.rating,
});
exports.mapCuisinesFromDb = (cuisines) => {
    return cuisines.map(exports.mapCuisineFromDb);
};
exports.mapAddressFromDB = (address) => {
    return {
        id: address.id,
        placeId: address.placeId,
        lat: address.lat,
        lng: address.lng,
        description: address.description,
        entrance: address.entrance,
        floor: address.floor,
        apartment: address.apartment,
        date: address.date,
    };
};
exports.mapAddressesFromDB = (addresses) => {
    return addresses.map(exports.mapAddressFromDB);
};
exports.mapAdditionalUserInfoFromDb = (user) => ({
    email: user.email,
    phoneNumber: user.phoneNumber,
});
exports.mapUserFromDb = (user, addAdditionalInfo = false) => ({
    id: user.id,
    image: user.image ? user.image.id : user.imageId,
    name: user.name,
    preferencesId: user.preferencesId,
    lat: user.lat,
    lng: user.lng,
    additionalUserInfo: addAdditionalInfo ? exports.mapAdditionalUserInfoFromDb(user) : undefined,
});
exports.mapRestaurantFromDb = (restaurant) => {
    if (!restaurant.cuisines)
        throw new SpoonError_1.default('Restaurant has no cuisines');
    if (!restaurant.user)
        throw new SpoonError_1.default('Restaurant has no user');
    return {
        id: restaurant.id,
        user: exports.mapUserFromDb(restaurant.user, true),
        imageId: restaurant.imageId,
        address: exports.mapAddressFromDB(restaurant.address),
        title: restaurant.title,
        description: restaurant.description,
        cuisines: exports.mapCuisinesFromDb(restaurant.cuisines),
    };
};
exports.mapRestaurantsFromDb = (restaurants) => {
    return restaurants.map(exports.mapRestaurantFromDb);
};
exports.mapClientFromDb = (client) => {
    if (!client.user)
        throw new SpoonError_1.default('Client user data not exist');
    return {
        id: client.id,
        user: exports.mapUserFromDb(client.user, true),
    };
};
exports.mapClientsFromDb = (clients) => clients.map(exports.mapClientFromDb);
exports.mapDocumentFromDb = (document) => ({
    id: document.id,
    fileId: document.fileId,
    group: document.group,
});
exports.mapDocumentsFromDb = (documents) => documents.map(exports.mapDocumentFromDb);
exports.mapDocumentRevisionFromDb = (revision) => ({
    id: revision.id,
    comment: revision.comment,
    status: revision.status,
});
exports.mapCourierFromDb = (courier) => {
    if (!courier.user)
        throw new SpoonError_1.default('Courier user data not exist');
    return {
        id: courier.id,
        user: exports.mapUserFromDb(courier.user, true),
        revision: courier.revision ? exports.mapDocumentRevisionFromDb(courier.revision) : undefined,
    };
};
exports.mapCouriersFromDb = (couriers) => couriers.map(exports.mapCourierFromDb);
exports.mapOrderInfoFromDb = (orderInfo) => {
    return {
        id: orderInfo.id,
        clientAddress: exports.mapAddressFromDB(orderInfo.clientAddress),
        distanceMiles: orderInfo.distanceMiles,
        priceCents: orderInfo.priceCents,
    };
};
exports.mapOrderFromDb = (order) => {
    if (!order.set)
        throw new SpoonError_1.default('Order not have set');
    if (!order.client)
        throw new SpoonError_1.default('Client data not exist');
    if (!order.client.user)
        throw new SpoonError_1.default('Client user data not exist');
    if (!order.cart)
        throw new SpoonError_1.default('Cart data not exist');
    return {
        id: order.id,
        number: order.number,
        state: order.state,
        created: order.created,
        courierId: order.courierId,
        courier: order.courier ? exports.mapCourierFromDb(order.courier) : undefined,
        placement: order.placement,
        rating: order.rating,
        client: exports.mapUserFromDb(order.client.user, true),
        restaurant: order.restaurant ? exports.mapRestaurantFromDb(order.restaurant) : undefined,
        bag: order.bag ? exports.mapBagFromDb(order.bag) : undefined,
        orderInfo: exports.mapOrderInfoFromDb(order.orderInfo),
        set: exports.mapSetFromDb(order.set),
        cart: exports.mapCartFromDb(order.cart),
        date: order.date,
    };
};
exports.mapOrderListFromDb = (orders) => {
    return orders.map((order) => exports.mapOrderFromDb(order));
};
exports.mapEmailForSpamFromDB = (email) => {
    return {
        id: email.id,
        email: email.email,
        isDiscount: email.isDiscount,
    };
};
exports.mapEmailForSpamListFromDb = (emails) => {
    return emails.map((email) => exports.mapEmailForSpamFromDB(email));
};
exports.mapPreferencesFromDb = (preferences) => ({
    id: preferences.id,
    allowPushNotifications: preferences.allowPushNotifications,
    allowEmailNotifications: preferences.allowEmailNotifications,
    allowSmsNotifications: preferences.allowSmsNotifications,
});
exports.mapAccountFromDB = (account, preferences) => ({
    user: exports.mapUserFromDb(account),
    info: exports.mapAdditionalUserInfoFromDb(account),
    preferences: exports.mapPreferencesFromDb(preferences),
});
exports.mapAdminFromDb = (admin) => {
    if (!admin.user)
        throw new SpoonError_1.default('Admin user data not exist');
    return {
        id: admin.id,
        user: exports.mapUserFromDb(admin.user),
    };
};
exports.mapAdminsFromDb = (admins) => admins.map(exports.mapAdminFromDb);
//# sourceMappingURL=Mappers.js.map