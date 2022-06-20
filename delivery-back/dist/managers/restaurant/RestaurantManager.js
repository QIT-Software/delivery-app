"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IRestaurantManager_1 = __importDefault(require("./IRestaurantManager"));
const IRestaurantStore_1 = __importDefault(require("../../database/stores/restaurant/IRestaurantStore"));
const Restaurant_1 = __importDefault(require("../../entities/Restaurant"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const IAuthManager_1 = __importDefault(require("../auth/IAuthManager"));
const AppType_1 = __importDefault(require("../../entities/AppType"));
const Platform_1 = require("../../entities/Platform");
const IAddressStore_1 = __importDefault(require("../../database/stores/address/IAddressStore"));
const ICuisineStore_1 = __importDefault(require("../../database/stores/cuisine/ICuisineStore"));
const IAccountManager_1 = __importDefault(require("../account/IAccountManager"));
let RestaurantManager = (() => {
    let RestaurantManager = class RestaurantManager extends IRestaurantManager_1.default {
        constructor(restaurantStore, authManager, accountManager, locationStore, cuisineStore) {
            super();
            this.restaurantStore = restaurantStore;
            this.authManager = authManager;
            this.accountManager = accountManager;
            this.locationStore = locationStore;
            this.cuisineStore = cuisineStore;
        }
        async getRestaurantById(id) {
            const restaurant = await this.restaurantStore.getRestaurantById(id);
            if (!restaurant)
                throw new SpoonError_1.default('there is no such restaurant');
            return Mappers_1.mapRestaurantFromDb(restaurant);
        }
        async getRestaurants() {
            return Mappers_1.mapRestaurantsFromDb(await this.restaurantStore.getRestaurants());
        }
        async getCurrentRestaurant(userId) {
            const restaurant = await this.restaurantStore.getRestaurantByUserId(userId);
            return !restaurant ? undefined : Mappers_1.mapRestaurantFromDb(restaurant);
        }
        async createRestaurant(name, email, phoneNumber, password, placeId, lat, lng, addressDescription, imageId, title, restaurantDescription, cuisines) {
            const user = await this.authManager.registerRestaurant(AppType_1.default.Restaurant, Platform_1.Platform.Android, email, password, name, phoneNumber);
            const date = new Date();
            const address = await this.locationStore.createAddress({
                placeId,
                lat,
                lng,
                description: addressDescription,
                entrance: undefined,
                floor: undefined,
                apartment: undefined,
                date,
            });
            const cuisinesFromDB = await this.cuisineStore.getCuisinesByIds(cuisines);
            return this.restaurantStore.createRestaurant(user.id, imageId, title, restaurantDescription, address, cuisinesFromDB);
        }
        async updateRestaurant(id, name, email, phoneNumber, placeId, lat, lng, addressDescription, imageId, title, restaurantDescription, cuisines) {
            const restaurant = await this.getRestaurantById(id);
            await this.accountManager.updateAccount(restaurant.user.id, {
                email,
                name,
                phoneNumber,
            });
            await this.accountManager.updateAccountImage(restaurant.user.id, imageId);
            const date = new Date();
            const address = await this.locationStore.updateAddress({
                id: restaurant.address.id,
                placeId,
                lat,
                lng,
                description: addressDescription,
                entrance: undefined,
                floor: undefined,
                apartment: undefined,
                date,
            });
            const cuisinesFromDB = await this.cuisineStore.getCuisinesByIds(cuisines);
            return Mappers_1.mapRestaurantFromDb(await this.restaurantStore.updateRestaurant(id, imageId, title, restaurantDescription, address, cuisinesFromDB));
        }
        async deleteRestaurant(restaurantId) {
            await this.restaurantStore.deleteRestaurant(restaurantId);
        }
    };
    RestaurantManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IRestaurantStore_1.default,
            IAuthManager_1.default,
            IAccountManager_1.default,
            IAddressStore_1.default,
            ICuisineStore_1.default])
    ], RestaurantManager);
    return RestaurantManager;
})();
exports.default = RestaurantManager;
//# sourceMappingURL=RestaurantManager.js.map