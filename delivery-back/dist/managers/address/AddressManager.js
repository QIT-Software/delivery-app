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
const common_1 = require("@nestjs/common");
const IAddressManager_1 = __importDefault(require("./IAddressManager"));
const AppType_1 = __importDefault(require("../../entities/AppType"));
const Mappers_1 = require("../../database/entities/Mappers");
const IRestaurantStore_1 = __importDefault(require("../../database/stores/restaurant/IRestaurantStore"));
const IRoadsService_1 = __importDefault(require("../../services/googleRoads/IRoadsService"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const IGeoService_1 = __importDefault(require("../../services/geolocation/IGeoService"));
const IOrderStore_1 = __importDefault(require("../../database/stores/order/IOrderStore"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const Address_1 = __importDefault(require("../../entities/Address"));
let AddressManager = (() => {
    let AddressManager = class AddressManager {
        constructor(restaurantStore, orderStore, roadsService, geoService, userStore) {
            this.restaurantStore = restaurantStore;
            this.orderStore = orderStore;
            this.roadsService = roadsService;
            this.geoService = geoService;
            this.userStore = userStore;
        }
        async getDistanceToRestaurant(restaurantId, lat, lng, appType) {
            if (appType !== AppType_1.default.Client)
                throw new SpoonError_1.default('you do not have enough rights');
            const restaurant = Mappers_1.mapRestaurantFromDb(await this.restaurantStore.getRestaurantById(restaurantId));
            const distanceMeters = await this.geoService.getDistanceMeters({ lat, lng }, { lat: restaurant.address.lat, lng: restaurant.address.lng });
            const distanceMiles = distanceMeters / 1609;
            return distanceMiles;
        }
        async getClientOrdersAddresses(userId) {
            const client = await this.userStore.getClientOrThrow(userId);
            const orders = await this.orderStore.getOrdersByUserId(client.id);
            const ordersUniqueByDescription = [
                ...new Map(orders.map((item) => [item.orderInfo.clientAddress.description, item])).values(),
            ];
            ordersUniqueByDescription.sort((a, b) => {
                const c = new Date(a.orderInfo.clientAddress.date);
                const d = new Date(b.orderInfo.clientAddress.date);
                return +c - +d;
            });
            return ordersUniqueByDescription
                .splice(ordersUniqueByDescription.length - 3, 3)
                .map((item) => item.orderInfo.clientAddress);
        }
    };
    AddressManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IRestaurantStore_1.default,
            IOrderStore_1.default,
            IRoadsService_1.default,
            IGeoService_1.default,
            IUserStore_1.default])
    ], AddressManager);
    return AddressManager;
})();
exports.default = AddressManager;
//# sourceMappingURL=AddressManager.js.map