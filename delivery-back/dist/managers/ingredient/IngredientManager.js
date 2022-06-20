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
const IIngredientManager_1 = __importDefault(require("./IIngredientManager"));
const IIngredientStore_1 = __importDefault(require("../../database/stores/ingredient/IIngredientStore"));
const Ingredient_1 = __importDefault(require("../../entities/Ingredient"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
let IngredientManager = (() => {
    let IngredientManager = class IngredientManager extends IIngredientManager_1.default {
        constructor(ingredientStore) {
            super();
            this.ingredientStore = ingredientStore;
        }
        async findIngredientByIdOrThrow(id) {
            const ingredient = await this.ingredientStore.findIngredientById(id);
            if (!ingredient)
                throw new SpoonError_1.default('Ingredient not found');
            return Mappers_1.mapIngredientFromDb(ingredient);
        }
        async getIngredientsByDishId(id) {
            const ingredients = await this.ingredientStore.getIngredientsByDishIdOrFail(id);
            return Mappers_1.mapIngredientsFromDb(ingredients);
        }
    };
    IngredientManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IIngredientStore_1.default])
    ], IngredientManager);
    return IngredientManager;
})();
exports.default = IngredientManager;
//# sourceMappingURL=IngredientManager.js.map