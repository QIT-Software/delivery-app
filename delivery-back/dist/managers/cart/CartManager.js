"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ICartStore_1 = __importDefault(require("../../database/stores/cart/ICartStore"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const Common_1 = require("../../entities/Common");
const IAddressStore_1 = __importDefault(require("../../database/stores/address/IAddressStore"));
const IBagStore_1 = __importDefault(require("../../database/stores/bag/IBagStore"));
const IRestaurantStore_1 = __importDefault(require("../../database/stores/restaurant/IRestaurantStore"));
const IAddressManager_1 = __importDefault(require("../address/IAddressManager"));
const IOrderManager_1 = __importDefault(require("../order/IOrderManager"));
const Mappers_1 = require("../../graphql/entities/Mappers");
const SelectedSetInfo_1 = __importDefault(require("../../entities/SelectedSetInfo"));
const ICartManager_1 = __importDefault(require("./ICartManager"));
const Cart_1 = __importStar(require("../../entities/Cart"));
const Mappers_2 = require("../../database/entities/Mappers");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const Set_1 = __importDefault(require("../../entities/Set"));
const IOrderStore_1 = __importDefault(require("../../database/stores/order/IOrderStore"));
let CartManager = (() => {
    let CartManager = class CartManager extends ICartManager_1.default {
        constructor(cartStore, userStore, locationStore, bagsStore, orderStore, restaurantStore, addressManager, orderManager) {
            super();
            this.cartStore = cartStore;
            this.userStore = userStore;
            this.locationStore = locationStore;
            this.bagsStore = bagsStore;
            this.orderStore = orderStore;
            this.restaurantStore = restaurantStore;
            this.addressManager = addressManager;
            this.orderManager = orderManager;
        }
        async createCartAndDistributeOrders(userId, clientAddress, selectedSetsInfo) {
            const cart = await this.createCart(userId);
            let cuisines;
            cuisines = selectedSetsInfo.map((item) => {
                return item.set.cuisineId;
            });
            cuisines = [...new Set(cuisines)];
            const restaurants = await this.orderStore.getRestaurantsByCuisines(cuisines);
            let restaurantsByCuisines = [];
            cuisines.forEach((item) => {
                restaurantsByCuisines.push({ cuisine: item, restaurantsIds: [] });
            });
            restaurantsByCuisines = restaurantsByCuisines.map((item) => {
                const rests = restaurants.filter((restaurant) => {
                    if (restaurant.cuisines) {
                        return (restaurant.cuisines.filter((cuisine) => cuisine.id === item.cuisine).length >
                            0);
                    }
                    return false;
                });
                return { cuisine: item.cuisine, restaurantsIds: rests.map((rest) => rest.id) };
            });
            const createOrders = async (setsInfo, quantity) => {
                const restaurant = restaurantsByCuisines.filter((restaurantsCuisineInfo) => restaurantsCuisineInfo.cuisine === setsInfo.set.cuisineId)[0].restaurantsIds[Math.floor(restaurants.length * Math.random())];
                const promises = [];
                for (let l = quantity; l > 0; l--) {
                    promises.push(this.createOrdersBySetsIds(cart.id, userId, setsInfo.set.id, clientAddress, setsInfo.numberOfDays, restaurant));
                }
                await Promise.all(promises);
            };
            selectedSetsInfo.map(async (item) => {
                const neededRestaurantsQuantity = item.quantity / 4;
                for (let j = Math.trunc(neededRestaurantsQuantity); j > 0; j--) {
                    await createOrders(item, 4);
                }
                if (Math.trunc(neededRestaurantsQuantity) !== neededRestaurantsQuantity) {
                    const numberOfRemainingSets = neededRestaurantsQuantity - Math.trunc(neededRestaurantsQuantity);
                    await createOrders(item, numberOfRemainingSets * 4);
                }
            });
            return Mappers_1.mapCartToGQL(cart);
        }
        async createOrdersBySetsIds(cartId, userId, setId, clientAddress, numberOfDays, restaurantId) {
            return this.orderManager.createOrder(cartId, userId, setId, clientAddress, restaurantId, numberOfDays);
        }
        async createCart(userId) {
            return Mappers_1.mapCartToGQL(await this.cartStore.createCart(userId, Cart_1.CartState.Active));
        }
        async getCartById(id) {
            const cart = await this.cartStore.getCartByIdOrFail(id);
            return Mappers_2.mapCartFromDb(cart);
        }
        async getCartByUserId(userId) {
            const cart = await this.cartStore.getCartByUserId(userId);
            return Mappers_2.mapCartFromDb(cart);
        }
        async getCartsByUserId(userId) {
            const carts = await this.cartStore.getCartsByUserId(userId);
            return Mappers_1.mapCartsFromDb(carts);
        }
        async deleteCart(userId, cartId) {
            const cart = await this.getCartById(cartId);
            if (!cart)
                throw new SpoonError_1.default('Cart not exists');
            await this.cartStore.deleteCart(cartId);
        }
    };
    CartManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [ICartStore_1.default,
            IUserStore_1.default,
            IAddressStore_1.default,
            IBagStore_1.default,
            IOrderStore_1.default,
            IRestaurantStore_1.default,
            IAddressManager_1.default,
            IOrderManager_1.default])
    ], CartManager);
    return CartManager;
})();
exports.default = CartManager;
//# sourceMappingURL=CartManager.js.map