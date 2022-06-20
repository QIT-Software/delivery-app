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
const ICuisineManager_1 = __importDefault(require("../../managers/cuisine/ICuisineManager"));
const Cuisine_1 = __importDefault(require("../entities/cuisine/Cuisine"));
const Mappers_1 = require("../entities/Mappers");
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
let CuisineResolver = (() => {
    let CuisineResolver = class CuisineResolver {
        constructor(cuisineManager) {
            this.cuisineManager = cuisineManager;
        }
        async cuisineById(id) {
            return Mappers_1.mapCuisineToGQL(await this.cuisineManager.findCuisineByIdOrThrow(id));
        }
        async getCuisines() {
            return Mappers_1.mapCuisinesToGQL(await this.cuisineManager.getCuisines());
        }
        async cuisinesByRestaurantId(id) {
            return Mappers_1.mapCuisinesToGQL(await this.cuisineManager.getCuisinesByRestaurantId(id));
        }
        async updateCuisine(id, imageId, nationality) {
            return Mappers_1.mapCuisineToGQL(await this.cuisineManager.updateCuisine(id, imageId, nationality));
        }
        async createCuisine(imageId, nationality) {
            await this.cuisineManager.createCuisine(imageId, nationality);
            return true;
        }
        async deleteCuisine(cuisineId) {
            await this.cuisineManager.deleteCuisine(cuisineId);
            return true;
        }
    };
    __decorate([
        graphql_1.Query(() => Cuisine_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CuisineResolver.prototype, "cuisineById", null);
    __decorate([
        graphql_1.Query(() => [Cuisine_1.default], { name: 'cuisines' }),
        Roles_1.default('Admin', 'Client'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], CuisineResolver.prototype, "getCuisines", null);
    __decorate([
        graphql_1.Query(() => [Cuisine_1.default], { name: 'cuisinesByRestaurantId' }),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CuisineResolver.prototype, "cuisinesByRestaurantId", null);
    __decorate([
        graphql_1.Mutation(() => Cuisine_1.default),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('imageId')),
        __param(2, graphql_1.Args('nationality')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], CuisineResolver.prototype, "updateCuisine", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('imageId')),
        __param(1, graphql_1.Args('nationality')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], CuisineResolver.prototype, "createCuisine", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'cuisineId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CuisineResolver.prototype, "deleteCuisine", null);
    CuisineResolver = __decorate([
        graphql_1.Resolver(),
        __metadata("design:paramtypes", [ICuisineManager_1.default])
    ], CuisineResolver);
    return CuisineResolver;
})();
exports.default = CuisineResolver;
//# sourceMappingURL=CuisineResolver.js.map