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
const IIngredientManager_1 = __importDefault(require("../../managers/ingredient/IIngredientManager"));
const Ingredient_1 = __importDefault(require("../entities/ingredient/Ingredient"));
const Mappers_1 = require("../entities/Mappers");
let IngredientResolver = (() => {
    let IngredientResolver = class IngredientResolver {
        constructor(ingredientManager) {
            this.ingredientManager = ingredientManager;
        }
        async ingredientById(id) {
            return Mappers_1.mapIngredientToGQL(await this.ingredientManager.findIngredientByIdOrThrow(id));
        }
        async ingredientsByDishId(id) {
            return Mappers_1.mapIngredientsToGQL(await this.ingredientManager.getIngredientsByDishId(id));
        }
    };
    __decorate([
        graphql_1.Query(() => Ingredient_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "ingredientById", null);
    __decorate([
        graphql_1.Query(() => [Ingredient_1.default]),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IngredientResolver.prototype, "ingredientsByDishId", null);
    IngredientResolver = __decorate([
        graphql_1.Resolver(),
        __metadata("design:paramtypes", [IIngredientManager_1.default])
    ], IngredientResolver);
    return IngredientResolver;
})();
exports.default = IngredientResolver;
//# sourceMappingURL=IngredientResolver.js.map