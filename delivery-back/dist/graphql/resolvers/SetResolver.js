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
const ISetManager_1 = __importDefault(require("../../managers/set/ISetManager"));
const Set_1 = __importDefault(require("../entities/set/Set"));
const Mappers_1 = require("../entities/Mappers");
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const SetIdAndDay_1 = __importDefault(require("../entities/set/SetIdAndDay"));
let SetResolver = (() => {
    let SetResolver = class SetResolver {
        constructor(setManager) {
            this.setManager = setManager;
        }
        async setById(id) {
            return Mappers_1.mapSetToGQL(await this.setManager.findSetByIdOrThrow(id));
        }
        async setsByCuisineId(id) {
            return Mappers_1.mapSetsToGQL(await this.setManager.getSetsByCuisineId(id));
        }
        async getSets() {
            return Mappers_1.mapSetsToGQL(await this.setManager.getSets());
        }
        async getSetsByDishId(id) {
            return Mappers_1.mapSetsToGQL(await this.setManager.getSetsByDishId(id));
        }
        async updateSet(id, name, imageId, priceCents, cuisineId, dishes, statuses) {
            return Mappers_1.mapSetToGQL(await this.setManager.updateSet(id, name, imageId, priceCents, cuisineId, dishes, statuses));
        }
        async createSet(name, imageId, priceCents, cuisineId, dishes, statuses) {
            await this.setManager.createSet(name, imageId, priceCents, cuisineId, dishes, statuses);
            return true;
        }
        async distributeSetsOfWeek(setIdsAndDays) {
            await this.setManager.distributeSetsOfWeek(setIdsAndDays);
            return true;
        }
        async deleteSet(setId) {
            await this.setManager.deleteSet(setId);
            return true;
        }
    };
    __decorate([
        graphql_1.Query(() => Set_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "setById", null);
    __decorate([
        graphql_1.Query(() => [Set_1.default]),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "setsByCuisineId", null);
    __decorate([
        graphql_1.Query(() => [Set_1.default], { name: 'sets' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "getSets", null);
    __decorate([
        graphql_1.Query(() => [Set_1.default], { name: 'setsByDishId' }),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "getSetsByDishId", null);
    __decorate([
        graphql_1.Mutation(() => Set_1.default),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('name')),
        __param(2, graphql_1.Args('imageId')),
        __param(3, graphql_1.Args('priceCents')),
        __param(4, graphql_1.Args('cuisineId')),
        __param(5, graphql_1.Args({ name: 'dishes', type: () => [String] })),
        __param(6, graphql_1.Args({ name: 'statuses', type: () => [String] })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, String, Array, Array]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "updateSet", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('name')),
        __param(1, graphql_1.Args('imageId')),
        __param(2, graphql_1.Args('priceCents')),
        __param(3, graphql_1.Args('cuisineId')),
        __param(4, graphql_1.Args({ name: 'dishes', type: () => [String] })),
        __param(5, graphql_1.Args({ name: 'statuses', type: () => [String] })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, Array, Array]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "createSet", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'setIdsAndDays', type: () => [SetIdAndDay_1.default] })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "distributeSetsOfWeek", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'setId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SetResolver.prototype, "deleteSet", null);
    SetResolver = __decorate([
        graphql_1.Resolver(),
        __metadata("design:paramtypes", [ISetManager_1.default])
    ], SetResolver);
    return SetResolver;
})();
exports.default = SetResolver;
//# sourceMappingURL=SetResolver.js.map