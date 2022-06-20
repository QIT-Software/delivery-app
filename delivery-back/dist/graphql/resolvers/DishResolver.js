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
const IDishManager_1 = __importDefault(require("../../managers/dish/IDishManager"));
const Dish_1 = __importDefault(require("../entities/dish/Dish"));
const Mappers_1 = require("../entities/Mappers");
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
let DishResolver = (() => {
    let DishResolver = class DishResolver {
        constructor(dishManager) {
            this.dishManager = dishManager;
        }
        async dishById(id) {
            return Mappers_1.mapDishToGQL(await this.dishManager.findDishByIdOrThrow(id));
        }
        async getDishes() {
            return Mappers_1.mapDishesToGQL(await this.dishManager.getDishes());
        }
        async dishesBySetId(id) {
            return Mappers_1.mapDishesToGQL(await this.dishManager.getDishesBySetId(id));
        }
        async updateDish(id, name, description, weight, kal, ingredients, sets, imageId) {
            return Mappers_1.mapDishToGQL(await this.dishManager.updateDish(id, imageId, name, description, weight, kal, ingredients, sets));
        }
        async createDish(imageId, name, description, weight, kal, ingredients, sets) {
            await this.dishManager.createDish(imageId, name, description, weight, kal, ingredients, sets);
            return true;
        }
        async deleteDish(dishId) {
            await this.dishManager.deleteDish(dishId);
            return true;
        }
    };
    __decorate([
        graphql_1.Query(() => Dish_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DishResolver.prototype, "dishById", null);
    __decorate([
        graphql_1.Query(() => [Dish_1.default], { name: 'dishes' }),
        Roles_1.default('Admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DishResolver.prototype, "getDishes", null);
    __decorate([
        graphql_1.Query(() => [Dish_1.default]),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DishResolver.prototype, "dishesBySetId", null);
    __decorate([
        graphql_1.Mutation(() => Dish_1.default),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('name')),
        __param(2, graphql_1.Args('description')),
        __param(3, graphql_1.Args('weight')),
        __param(4, graphql_1.Args('kal')),
        __param(5, graphql_1.Args({ name: 'ingredients', type: () => [String] })),
        __param(6, graphql_1.Args({ name: 'sets', type: () => [String] })),
        __param(7, graphql_1.Args('imageId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, String, Array, Array, String]),
        __metadata("design:returntype", Promise)
    ], DishResolver.prototype, "updateDish", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('imageId')),
        __param(1, graphql_1.Args('name')),
        __param(2, graphql_1.Args('description')),
        __param(3, graphql_1.Args('weight')),
        __param(4, graphql_1.Args('kal')),
        __param(5, graphql_1.Args({ name: 'ingredients', type: () => [String] })),
        __param(6, graphql_1.Args({ name: 'sets', type: () => [String] })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, String, Array, Array]),
        __metadata("design:returntype", Promise)
    ], DishResolver.prototype, "createDish", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'dishId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DishResolver.prototype, "deleteDish", null);
    DishResolver = __decorate([
        graphql_1.Resolver(),
        __metadata("design:paramtypes", [IDishManager_1.default])
    ], DishResolver);
    return DishResolver;
})();
exports.default = DishResolver;
//# sourceMappingURL=DishResolver.js.map