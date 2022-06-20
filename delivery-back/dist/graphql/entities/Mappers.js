"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEmailForSpamToGQL = exports.mapAccountToGQL = exports.mapPreferencesToGQL = exports.mapOrdersToGQL = exports.mapOrderToGQL = exports.mapCouriersToGQL = exports.mapCourierToGQL = exports.mapDocumentsRevisionToGQL = exports.mapDocumentsToGQL = exports.mapDocumentToGQL = exports.mapClientsToGQL = exports.mapClientToGQL = exports.mapUserToGQL = exports.mapOrderInfoToGQL = exports.mapLocationsToGQL = exports.mapLocationToGQL = exports.mapAdditionalUserInfoToGQL = exports.mapLatLngToGQL = exports.mapRestaurantsToGQL = exports.mapRestaurantToGQL = exports.mapCuisinesToGQL = exports.mapCuisineToGQL = exports.mapSetsToGQL = exports.mapSetToGQL = exports.mapDishesToGQL = exports.mapDishToGQL = exports.mapStatusesToGQL = exports.mapStatusToGQL = exports.mapIngredientsToGQL = exports.mapIngredientToGQL = exports.mapRequestedPaymentToGQL = exports.mapCartsFromDb = exports.mapBagsToGQL = exports.mapCartsToGQL = exports.mapCartToGQL = exports.mapSetIdAndStatusToGQL = exports.mapBagToGQL = void 0;
const RequestedPayment_1 = __importDefault(require("./payment/RequestedPayment"));
const Payment_1 = require("../../entities/Payment");
const Courier_1 = __importDefault(require("../../entities/Courier"));
const Client_1 = __importDefault(require("../../entities/Client"));
const Client_2 = __importDefault(require("./user/Client"));
const Courier_2 = __importDefault(require("./user/Courier"));
const LatLng_1 = __importDefault(require("../../entities/LatLng"));
const Address_1 = __importDefault(require("./address/Address"));
const Address_2 = __importDefault(require("../../entities/Address"));
const Ingredient_1 = __importDefault(require("./ingredient/Ingredient"));
const Ingredient_2 = __importDefault(require("../../entities/Ingredient"));
const Status_1 = __importDefault(require("./status/Status"));
const Status_2 = __importDefault(require("../../entities/Status"));
const Dish_1 = __importDefault(require("./dish/Dish"));
const Dish_2 = __importDefault(require("../../entities/Dish"));
const Set_1 = __importDefault(require("./set/Set"));
const Set_2 = __importDefault(require("../../entities/Set"));
const Cuisine_1 = __importDefault(require("./cuisine/Cuisine"));
const Cuisine_2 = __importDefault(require("../../entities/Cuisine"));
const Restaurant_1 = __importDefault(require("./restaurant/Restaurant"));
const Restaurant_2 = __importDefault(require("../../entities/Restaurant"));
const Preferences_1 = __importDefault(require("./user/Preferences"));
const Document_1 = require("../../entities/Document");
const Document_2 = __importDefault(require("./document/Document"));
const DocumentsRevision_1 = __importDefault(require("./document/DocumentsRevision"));
const SetIdAndDay_1 = __importDefault(require("../../entities/SetIdAndDay"));
const SetIdAndDay_2 = __importDefault(require("./set/SetIdAndDay"));
const EmailForSpam_1 = __importDefault(require("./emailForSpam/EmailForSpam"));
const EmailForSpam_2 = __importDefault(require("../../entities/EmailForSpam"));
exports.mapBagToGQL = (bag) => ({
    id: bag.id,
    code: bag.code,
});
exports.mapSetIdAndStatusToGQL = (setIdAndDay) => ({
    setId: setIdAndDay.setId,
    day: setIdAndDay.day,
});
exports.mapCartToGQL = (cart) => ({
    id: cart.id,
    userId: cart.userId,
    status: cart.status,
});
exports.mapCartsToGQL = (carts) => {
    return carts.map(exports.mapCartToGQL);
};
exports.mapBagsToGQL = (bags) => {
    return bags.map(exports.mapBagToGQL);
};
exports.mapCartsFromDb = (carts) => {
    return carts.map(exports.mapCartToGQL);
};
exports.mapRequestedPaymentToGQL = (payment) => ({
    orderId: payment.orderId,
    redirectUrl: payment.redirectUrl,
    status: payment.status,
});
exports.mapIngredientToGQL = (ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
});
exports.mapIngredientsToGQL = (ingredients) => {
    return ingredients.map(exports.mapIngredientToGQL);
};
exports.mapStatusToGQL = (status) => ({
    id: status.id,
    name: status.name,
    imageId: status.imageId,
});
exports.mapStatusesToGQL = (statuses) => {
    return statuses.map(exports.mapStatusToGQL);
};
exports.mapDishToGQL = (dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    imageId: dish.imageId,
    weight: dish.weight,
    kal: dish.kal,
    ingredients: dish.ingredients,
});
exports.mapDishesToGQL = (dishes) => {
    return dishes.map((dish) => exports.mapDishToGQL(dish));
};
exports.mapSetToGQL = (set) => ({
    id: set.id,
    name: set.name,
    imageId: set.imageId,
    cuisineId: set.cuisineId,
    priceCents: set.priceCents,
    dishes: set.dishes,
    statuses: set.statuses,
    day: set.day,
    isFavorite: set.isFavorite,
});
exports.mapSetsToGQL = (sets) => {
    return sets.map(exports.mapSetToGQL);
};
exports.mapCuisineToGQL = (cuisine) => ({
    id: cuisine.id,
    imageId: cuisine.imageId,
    nationality: cuisine.nationality,
    rating: cuisine.rating,
});
exports.mapCuisinesToGQL = (cuisines) => {
    return cuisines.map(exports.mapCuisineToGQL);
};
exports.mapRestaurantToGQL = (restaurant) => ({
    id: restaurant.id,
    user: restaurant.user,
    imageId: restaurant.imageId,
    address: restaurant.address,
    title: restaurant.title,
    description: restaurant.description,
    cuisines: restaurant.cuisines,
});
exports.mapRestaurantsToGQL = (restaurants) => {
    return restaurants.map(exports.mapRestaurantToGQL);
};
exports.mapLatLngToGQL = (location) => ({
    lat: location.lat,
    lng: location.lng,
});
exports.mapAdditionalUserInfoToGQL = (additionalInfo) => ({
    phoneNumber: additionalInfo.phoneNumber,
    email: additionalInfo.email,
});
exports.mapLocationToGQL = (address) => ({
    id: address.id,
    placeId: address.placeId,
    description: address.description,
    entrance: address.entrance,
    floor: address.floor,
    apartment: address.apartment,
    date: address.date,
    lat: address.lat,
    lng: address.lng,
});
exports.mapLocationsToGQL = (addresses) => {
    return addresses.map(exports.mapLocationToGQL);
};
exports.mapOrderInfoToGQL = (orderInfo) => ({
    id: orderInfo.id,
    clientAddress: exports.mapLocationToGQL(orderInfo.clientAddress),
    distanceMiles: orderInfo.distanceMiles,
    priceCents: orderInfo.priceCents,
});
exports.mapUserToGQL = (user) => {
    return {
        id: user.id,
        image: user.image,
        name: user.name,
        preferencesId: user.preferencesId,
        lat: user.lat,
        lng: user.lng,
        additionalUserInfo: user.additionalUserInfo
            ? exports.mapAdditionalUserInfoToGQL(user.additionalUserInfo)
            : undefined,
    };
};
exports.mapClientToGQL = (client) => ({
    id: client.id,
    user: exports.mapUserToGQL(client.user),
});
exports.mapClientsToGQL = (clients) => clients.map(exports.mapClientToGQL);
exports.mapDocumentToGQL = (document) => ({
    id: document.id,
    fileId: document.fileId,
    group: document.group,
});
exports.mapDocumentsToGQL = (documents) => documents.map(exports.mapDocumentToGQL);
exports.mapDocumentsRevisionToGQL = (revision) => ({
    id: revision.id,
    comment: revision.comment,
    status: revision.status,
});
exports.mapCourierToGQL = (courier) => ({
    id: courier.id,
    user: exports.mapUserToGQL(courier.user),
    revision: courier.revision ? exports.mapDocumentsRevisionToGQL(courier.revision) : undefined,
});
exports.mapCouriersToGQL = (couriers) => couriers.map(exports.mapCourierToGQL);
exports.mapOrderToGQL = (order) => {
    return {
        id: order.id,
        restaurant: order.restaurant ? exports.mapRestaurantToGQL(order.restaurant) : undefined,
        client: exports.mapUserToGQL(order.client),
        cart: exports.mapCartToGQL(order.cart),
        bag: order.bag ? exports.mapBagToGQL(order.bag) : undefined,
        set: exports.mapSetToGQL(order.set),
        number: order.number,
        orderInfo: exports.mapOrderInfoToGQL(order.orderInfo),
        created: order.created,
        placement: order.placement,
        state: order.state,
        courierId: order.courierId,
        courier: order.courier,
        rating: order.rating,
        date: order.date,
    };
};
exports.mapOrdersToGQL = (orders) => orders.map((order) => exports.mapOrderToGQL(order));
exports.mapPreferencesToGQL = (preferences) => ({
    id: preferences.id,
    allowPushNotifications: preferences.allowPushNotifications,
    allowEmailNotifications: preferences.allowEmailNotifications,
    allowSmsNotifications: preferences.allowSmsNotifications,
});
exports.mapAccountToGQL = (account) => ({
    user: exports.mapUserToGQL(account.user),
    info: exports.mapAdditionalUserInfoToGQL(account.info),
    preferences: exports.mapPreferencesToGQL(account.preferences),
});
exports.mapEmailForSpamToGQL = (email) => ({
    id: email.id,
    email: email.email,
    isDiscount: email.isDiscount,
});
//# sourceMappingURL=Mappers.js.map