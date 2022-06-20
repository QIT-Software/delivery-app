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
const IStatusManager_1 = __importDefault(require("../../managers/status/IStatusManager"));
const Status_1 = __importDefault(require("../entities/status/Status"));
const Mappers_1 = require("../entities/Mappers");
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
let IngredientResolver = (() => {
    let IngredientResolver = class IngredientResolver {
        constructor(statusManager) {
            this.statusManager = statusManager;
        }
        async statusById(id) {
            return Mappers_1.mapStatusToGQL(await this.statusManager.findStatusByIdOrThrow(id));
        }
        async getStatuses() {
            return Mappers_1.mapStatusesToGQL(await this.statusManager.getStatuses());
        }
        async ingredientById(id) {
            return Mappers_1.mapStatusToGQL(await this.statusManager.findStatusByIdOrThrow(id));
        }
        async ingredientsByDishId(id) {
            return Mappers_1.mapStatusesToGQL(await this.statusManager.getStatusesBySetId(id));
        }
        async updateStatus(id, imageId, name) {
            return Mappers_1.mapStatusToGQL(await this.statusManager.updateStatus(id, imageId, name));
        }
        async createStatus(imageId, name) {
            await this.statusManager.createStatus(imageId, name);
            return true;
        }
        async deleteStatus(statusId) {
            await this.statusManager.deleteStatus(statusId);
            return true;
        }
    };
    __decorate([
        graphql_1.Query(() => Status_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "statusById", null);
    __decorate([
        graphql_1.Query(() => [Status_1.default], { name: 'statuses' }),
        Roles_1.default('Admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "getStatuses", null);
    __decorate([
        graphql_1.Query(() => Status_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "ingredientById", null);
    __decorate([
        graphql_1.Query(() => [Status_1.default]),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "ingredientsByDishId", null);
    __decorate([
        graphql_1.Mutation(() => Status_1.default),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('imageId')),
        __param(2, graphql_1.Args('name')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "updateStatus", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args('imageId')), __param(1, graphql_1.Args('name')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "createStatus", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'statusId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "deleteStatus", null);
    IngredientResolver = __decorate([
        graphql_1.Resolver(),
        __metadata("design:paramtypes", [IStatusManager_1.default])
    ], IngredientResolver);
    return IngredientResolver;
})();
exports.default = IngredientResolver;
//# sourceMappingURL=StatusResolver.js.map