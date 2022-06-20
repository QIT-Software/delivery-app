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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IAddressStore_1 = __importDefault(require("./IAddressStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Address_1 = __importDefault(require("../../entities/Address"));
const typeorm_2 = require("typeorm");
const OrderInfo_1 = __importDefault(require("../../entities/OrderInfo"));
let AddressStore = (() => {
    let AddressStore = class AddressStore extends IAddressStore_1.default {
        constructor(repository, orderInfoRepository) {
            super();
            this.repository = repository;
            this.orderInfoRepository = orderInfoRepository;
        }
        async createAddress(address) {
            const newAddress = this.repository.create({
                placeId: address.placeId,
                lat: address.lat,
                lng: address.lng,
                description: address.description,
                entrance: address.entrance,
                floor: address.floor,
                apartment: address.apartment,
                date: address.date,
            });
            await this.repository.insert(newAddress);
            return newAddress;
        }
        async updateAddress(address) {
            await this.repository.update(address.id, {
                placeId: address.placeId,
                lat: address.lat,
                lng: address.lng,
                description: address.description,
                entrance: address.entrance,
                floor: address.floor,
                apartment: address.apartment,
                date: address.date,
            });
            return this.repository.findOneOrFail(address.id);
        }
        async getUserAddressesFromOrder(clientAddressId) {
            return this.orderInfoRepository.find({
                where: { clientAddressId },
                relations: ['clientAddress'],
            });
        }
    };
    AddressStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Address_1.default)),
        __param(1, typeorm_1.InjectRepository(OrderInfo_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], AddressStore);
    return AddressStore;
})();
exports.default = AddressStore;
//# sourceMappingURL=AddressStore.js.map