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
const graphql_1 = require("@nestjs/graphql");
const IRestaurantManager_1 = __importDefault(require("../../managers/restaurant/IRestaurantManager"));
const Mappers_1 = require("../entities/Mappers");
const Restaurant_1 = __importDefault(require("../entities/restaurant/Restaurant"));
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const common_1 = require("@nestjs/common");
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Session_1 = __importDefault(require("../../entities/Session"));
let RestaurantResolver = (() => {
    let RestaurantResolver = class RestaurantResolver {
        constructor(restaurantManager) {
            this.restaurantManager = restaurantManager;
        }
        async createRestaurant(name, email, phoneNumber, password, lat, lng, addressDescription, imageId, title, restaurantDescription, cuisines, placeId) {
            await this.restaurantManager.createRestaurant(name, email, phoneNumber, password, placeId, lat, lng, addressDescription, imageId, title, restaurantDescription, cuisines);
            return true;
        }
        async updateRestaurant(id, name, email, phoneNumber, lat, lng, addressDescription, imageId, title, restaurantDescription, cuisines, placeId) {
            return Mappers_1.mapRestaurantToGQL(await this.restaurantManager.updateRestaurant(id, name, email, phoneNumber, placeId, lat, lng, addressDescription, imageId, title, restaurantDescription, cuisines));
        }
        async deleteRestaurant(restaurantId) {
            await this.restaurantManager.deleteRestaurant(restaurantId);
            return true;
        }
        async getRestaurants() {
            return Mappers_1.mapRestaurantsToGQL(await this.restaurantManager.getRestaurants());
        }
        async getRestaurantById(restaurantId) {
            return Mappers_1.mapRestaurantToGQL(await this.restaurantManager.getRestaurantById(restaurantId));
        }
        async currentRestaurant({ userId }) {
            const restaurant = await this.restaurantManager.getCurrentRestaurant(userId);
            return !restaurant ? restaurant : Mappers_1.mapRestaurantToGQL(restaurant);
        }
    };
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('name')),
        __param(1, graphql_1.Args('email')),
        __param(2, graphql_1.Args('phoneNumber')),
        __param(3, graphql_1.Args('password')),
        __param(4, graphql_1.Args('lat')),
        __param(5, graphql_1.Args('lng')),
        __param(6, graphql_1.Args('addressDescription')),
        __param(7, graphql_1.Args('imageId')),
        __param(8, graphql_1.Args('title')),
        __param(9, graphql_1.Args('restaurantDescription')),
        __param(10, graphql_1.Args({ name: 'cuisines', type: () => [String] })),
        __param(11, graphql_1.Args('placeId', { nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, Number, Number, String, String, String, String, Array, String]),
        __metadata("design:returntype", Promise)
    ], RestaurantResolver.prototype, "createRestaurant", null);
    __decorate([
        graphql_1.Mutation(() => Restaurant_1.default),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('name')),
        __param(2, graphql_1.Args('email')),
        __param(3, graphql_1.Args('phoneNumber')),
        __param(4, graphql_1.Args('lat')),
        __param(5, graphql_1.Args('lng')),
        __param(6, graphql_1.Args('addressDescription')),
        __param(7, graphql_1.Args('imageId')),
        __param(8, graphql_1.Args('title')),
        __param(9, graphql_1.Args('restaurantDescription')),
        __param(10, graphql_1.Args({ name: 'cuisines', type: () => [String] })),
        __param(11, graphql_1.Args('placeId', { nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, Number, Number, String, String, String, String, Array, String]),
        __metadata("design:returntype", Promise)
    ], RestaurantResolver.prototype, "updateRestaurant", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'restaurantId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RestaurantResolver.prototype, "deleteRestaurant", null);
    __decorate([
        graphql_1.Query(() => [Restaurant_1.default], { name: 'restaurants' }),
        Roles_1.default('Admin', 'Courier'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RestaurantResolver.prototype, "getRestaurants", null);
    __decorate([
        graphql_1.Query(() => Restaurant_1.default, { name: 'restaurantById' }),
        Roles_1.default('Admin', 'Courier', 'Client'),
        __param(0, graphql_1.Args({ name: 'restaurantId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RestaurantResolver.prototype, "getRestaurantById", null);
    __decorate([
        graphql_1.Query(() => Restaurant_1.default, { nullable: true }),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], RestaurantResolver.prototype, "currentRestaurant", null);
    RestaurantResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IRestaurantManager_1.default])
    ], RestaurantResolver);
    return RestaurantResolver;
})();
exports.default = RestaurantResolver;
//# sourceMappingURL=RestaurantResolver.js.map