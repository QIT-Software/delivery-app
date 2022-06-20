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
const IIngredientStore_1 = __importDefault(require("./IIngredientStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Ingredient_1 = __importDefault(require("../../entities/Ingredient"));
const typeorm_2 = require("typeorm");
const Dish_1 = __importDefault(require("../../entities/Dish"));
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
let IngredientStore = (() => {
    let IngredientStore = class IngredientStore extends IIngredientStore_1.default {
        constructor(repository, dish) {
            super();
            this.repository = repository;
            this.dish = dish;
        }
        async findIngredientById(id) {
            return this.repository.findOne({
                where: { id },
            });
        }
        async getIngredientsByDishIdOrFail(id) {
            const dish = await this.dish.findOneOrFail(id, { relations: ['ingredients'] });
            if (!dish.ingredients)
                throw new SpoonError_1.default('Dish ingredients not found');
            return dish.ingredients;
        }
        async createIngredients(ingredienNames) {
            const ingredients = ingredienNames.map((ingredienName) => this.repository.create({ name: ingredienName }));
            await this.repository.insert(ingredients);
            await this.repository.save(ingredients);
            return ingredients;
        }
    };
    IngredientStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Ingredient_1.default)),
        __param(1, typeorm_1.InjectRepository(Dish_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], IngredientStore);
    return IngredientStore;
})();
exports.default = IngredientStore;
//# sourceMappingURL=IngredientStore.js.map