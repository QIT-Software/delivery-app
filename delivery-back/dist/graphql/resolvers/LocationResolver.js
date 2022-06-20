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
exports.LocationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const ILocationManager_1 = __importDefault(require("../../managers/location/ILocationManager"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Session_1 = __importDefault(require("../../entities/Session"));
const CreateAddressRequest_1 = __importDefault(require("../entities/address/CreateAddressRequest"));
const IAddressManager_1 = __importDefault(require("../../managers/address/IAddressManager"));
const Address_1 = __importDefault(require("../entities/address/Address"));
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const LatLngInput_1 = __importDefault(require("../entities/address/LatLngInput"));
const LatLng_1 = __importDefault(require("../entities/address/LatLng"));
let LocationResolver = (() => {
    let LocationResolver = class LocationResolver {
        constructor(locationManager, addressManager) {
            this.locationManager = locationManager;
            this.addressManager = addressManager;
        }
        async createAddress({ userId }, location) {
            await this.locationManager.createAddress(userId, location);
            return true;
        }
        async clientOrdersAddresses({ userId }) {
            return this.addressManager.getClientOrdersAddresses(userId);
        }
        async updateLocation({ userId }, latLng) {
            await this.locationManager.updateLocation(userId, latLng);
            return true;
        }
        async userLocation(id) {
            return this.locationManager.getUserLocation(id);
        }
    };
    __decorate([
        graphql_1.Mutation(() => Boolean),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('location')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, CreateAddressRequest_1.default]),
        __metadata("design:returntype", Promise)
    ], LocationResolver.prototype, "createAddress", null);
    __decorate([
        graphql_1.Query(() => [Address_1.default]),
        Roles_1.default('Client'),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LocationResolver.prototype, "clientOrdersAddresses", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('latLng')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, LatLngInput_1.default]),
        __metadata("design:returntype", Promise)
    ], LocationResolver.prototype, "updateLocation", null);
    __decorate([
        graphql_1.Query(() => LatLng_1.default, { nullable: true }),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], LocationResolver.prototype, "userLocation", null);
    LocationResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [ILocationManager_1.default,
            IAddressManager_1.default])
    ], LocationResolver);
    return LocationResolver;
})();
exports.LocationResolver = LocationResolver;
//# sourceMappingURL=LocationResolver.js.map