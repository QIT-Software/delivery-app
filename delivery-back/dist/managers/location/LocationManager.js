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
const ILocationManager_1 = __importDefault(require("./ILocationManager"));
const CreateAddressRequest_1 = __importDefault(require("../../entities/CreateAddressRequest"));
const IAddressStore_1 = __importDefault(require("../../database/stores/address/IAddressStore"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const LatLng_1 = __importDefault(require("../../entities/LatLng"));
let LocationManager = (() => {
    let LocationManager = class LocationManager {
        constructor(addressStore, userStore) {
            this.addressStore = addressStore;
            this.userStore = userStore;
        }
        async createAddress(userId, address) {
            const date = new Date();
            await this.addressStore.createAddress(Object.assign(Object.assign({}, address), { date }));
        }
        async createAddressForRestaurant(userId, address) {
            const date = new Date();
            return this.addressStore.createAddress(Object.assign(Object.assign({}, address), { date }));
        }
        async updateLocation(userId, latLng) {
            await this.userStore.updateLocation(userId, latLng);
        }
        async getUserLocation(id) {
            const courier = await this.userStore.getCourierById(id);
            if (!courier)
                throw new SpoonError_1.default('Such courier does not exist');
            const { user } = courier;
            if (!user)
                throw new SpoonError_1.default('Such user does not exist');
            return user.lat && user.lng ? { lat: user.lat, lng: user.lng } : undefined;
        }
    };
    LocationManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IAddressStore_1.default,
            IUserStore_1.default])
    ], LocationManager);
    return LocationManager;
})();
exports.default = LocationManager;
//# sourceMappingURL=LocationManager.js.map