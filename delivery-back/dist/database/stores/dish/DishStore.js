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
const IDishStore_1 = __importDefault(require("./IDishStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Dish_1 = __importDefault(require("../../entities/Dish"));
const typeorm_2 = require("typeorm");
const Set_1 = __importDefault(require("../../entities/Set"));
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
const Ingredient_1 = __importDefault(require("../../entities/Ingredient"));
let DishStore = (() => {
    let DishStore = class DishStore extends IDishStore_1.default {
        constructor(repository, setRepository, ingredientRepository) {
            super();
            this.repository = repository;
            this.setRepository = setRepository;
            this.ingredientRepository = ingredientRepository;
        }
        async findDishById(id) {
            return this.repository.findOne(id, {
                relations: ['ingredients'],
            });
        }
        async findDishOrThrowById(id) {
            return this.repository.findOneOrFail(id, {
                relations: ['ingredients'],
            });
        }
        async getDishes() {
            return this.repository.find({
                relations: ['ingredients'],
            });
        }
        async getSelectedDishes(ids) {
            return this.repository.find({
                relations: ['ingredients'],
                where: { id: typeorm_2.In(ids) },
            });
        }
        async getDishesBySetIdOrFail(id) {
            const set = await this.setRepository.findOneOrFail(id, {
                relations: ['dishes', 'dishes.ingredients'],
            });
            if (!set.dishes)
                throw new SpoonError_1.default('Set dishes not found');
            return set.dishes;
        }
        async updateDish(id, imageId, name, description, weight, kal, ingredients) {
            await this.repository.update(id, {
                imageId,
                name,
                description,
                weight,
                kal,
            });
            const dish = await this.findDishOrThrowById(id);
            if (!dish.ingredients)
                throw new Error('dish.ingredients must be not undefined');
            dish.ingredients = ingredients;
            await this.repository.save(dish);
            return dish;
        }
        async createDish(imageId, name, description, weight, kal, ingredients) {
            const dish = await this.repository.create({
                imageId,
                name,
                description,
                weight,
                kal,
                ingredients,
            });
            await this.repository.insert(dish);
            await this.repository.save(dish);
            return this.repository.findOneOrFail({
                id: dish.id,
            });
        }
        async deleteDish(id) {
            await this.repository.delete({ id });
        }
    };
    DishStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Dish_1.default)),
        __param(1, typeorm_1.InjectRepository(Set_1.default)),
        __param(2, typeorm_1.InjectRepository(Ingredient_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository])
    ], DishStore);
    return DishStore;
})();
exports.default = DishStore;
//# sourceMappingURL=DishStore.js.map