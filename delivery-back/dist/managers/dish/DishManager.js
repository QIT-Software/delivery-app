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
const IDishManager_1 = __importDefault(require("./IDishManager"));
const IDishStore_1 = __importDefault(require("../../database/stores/dish/IDishStore"));
const Dish_1 = __importDefault(require("../../entities/Dish"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const IIngredientStore_1 = __importDefault(require("../../database/stores/ingredient/IIngredientStore"));
const ISetStore_1 = __importDefault(require("../../database/stores/set/ISetStore"));
const Common_1 = require("../../entities/Common");
let DishManager = (() => {
    let DishManager = class DishManager extends IDishManager_1.default {
        constructor(dishStore, ingredientStore, setStore) {
            super();
            this.dishStore = dishStore;
            this.ingredientStore = ingredientStore;
            this.setStore = setStore;
        }
        async findDishByIdOrThrow(id) {
            const dish = await this.dishStore.findDishById(id);
            if (!dish)
                throw new SpoonError_1.default('Dish not found');
            return Mappers_1.mapDishFromDb(dish);
        }
        async getDishes() {
            return Mappers_1.mapDishesFromDb(await this.dishStore.getDishes());
        }
        async getDishesBySetId(id) {
            const dishes = await this.dishStore.getDishesBySetIdOrFail(id);
            return Mappers_1.mapDishesFromDb(dishes);
        }
        async updateDish(id, imageId, name, description, weight, kal, ingredients, sets) {
            const ingredientsDB = await this.ingredientStore.createIngredients(ingredients);
            const updatedDish = await this.dishStore.updateDish(id, imageId, name, description, weight, kal, ingredientsDB);
            const dishSets = await this.setStore.getSetsByDishId(updatedDish.id);
            const dishSetsIds = dishSets.map((set) => set.id);
            const setsToAddDish = sets.filter((x) => !dishSetsIds.includes(x));
            const setsToDeleteDish = dishSetsIds.filter((x) => !sets.includes(x));
            await this.setStore.addDishToSelectedSets(updatedDish, setsToAddDish);
            await this.setStore.deleteDishFromSelectedSets(updatedDish, setsToDeleteDish);
            return Mappers_1.mapDishFromDb(updatedDish);
        }
        async createDish(imageId, name, description, weight, kal, ingredients, sets) {
            const ingredientsDB = await this.ingredientStore.createIngredients(ingredients);
            const dish = await this.dishStore.createDish(imageId, name, description, weight, kal, ingredientsDB);
            await this.setStore.addDishToSelectedSets(dish, sets);
        }
        async deleteDish(dishId) {
            await this.dishStore.deleteDish(dishId);
        }
    };
    DishManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IDishStore_1.default,
            IIngredientStore_1.default,
            ISetStore_1.default])
    ], DishManager);
    return DishManager;
})();
exports.default = DishManager;
//# sourceMappingURL=DishManager.js.map