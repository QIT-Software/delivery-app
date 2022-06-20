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
const ISetStore_1 = __importDefault(require("./ISetStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Set_1 = __importDefault(require("../../entities/Set"));
const typeorm_2 = require("typeorm");
const Cuisine_1 = __importDefault(require("../../entities/Cuisine"));
const Dish_1 = __importDefault(require("../../entities/Dish"));
const Status_1 = __importDefault(require("../../entities/Status"));
const ICuisineStore_1 = __importDefault(require("../cuisine/ICuisineStore"));
const SetIdAndDay_1 = __importDefault(require("../../../entities/SetIdAndDay"));
let SetStore = (() => {
    let SetStore = class SetStore extends ISetStore_1.default {
        constructor(repository, cuisineRepository, cuisineStore) {
            super();
            this.repository = repository;
            this.cuisineRepository = cuisineRepository;
            this.cuisineStore = cuisineStore;
        }
        async findSetById(id) {
            return this.repository.findOneOrFail(id, {
                relations: ['statuses', 'dishes', 'dishes.ingredients'],
            });
        }
        async getCuisineSets(cuisineId) {
            return this.repository.find({
                where: { cuisineId },
                relations: ['dishes', 'dishes.ingredients', 'statuses'],
            });
        }
        async getSets() {
            return this.repository.find({
                relations: ['dishes', 'dishes.ingredients', 'statuses'],
            });
        }
        async getSetsByDishId(dishId) {
            return this.repository
                .createQueryBuilder('s')
                .innerJoinAndSelect('s.dishes', 'dishes')
                .innerJoinAndSelect('dishes.ingredients', 'ingredients')
                .innerJoinAndSelect('s.statuses', 'statuses')
                .where('dishes.id = :id', { id: dishId })
                .getMany();
        }
        async updateSet(id, name, imageId, priceCents, cuisine, dishes, statuses) {
            const cuisineDB = await this.cuisineStore.findCuisineById(cuisine);
            await this.repository.update(id, {
                imageId,
                name,
                priceCents,
                cuisine: cuisineDB,
            });
            const set = await this.findSetById(id);
            if (!set.dishes)
                throw new Error('set.dishes must be not undefined');
            set.dishes = dishes;
            if (!set.statuses)
                throw new Error('set.statuses must be not undefined');
            set.statuses = statuses;
            await this.repository.save(set);
            return set;
        }
        async createSet(name, imageId, priceCents, cuisine, dishes, statuses) {
            const cuisineDB = await this.cuisineStore.findCuisineById(cuisine);
            const dish = await this.repository.create({
                imageId,
                name,
                priceCents,
                cuisine: cuisineDB,
                dishes,
                statuses,
            });
            await this.repository.insert(dish);
            await this.repository.save(dish);
        }
        async updateSetDishes(id, dishes) {
            const set = await this.repository.findOneOrFail(id, {
                relations: ['cuisine', 'dishes', 'dishes.ingredients', 'statuses'],
            });
            if (!set.dishes)
                throw new Error('set.dishes must be not undefined');
            set.dishes = dishes;
            await this.repository.save(set);
        }
        async updateSetStatuses(id, statuses) {
            const set = await this.repository.findOneOrFail(id, {
                relations: ['cuisine', 'dishes', 'dishes.ingredients', 'statuses'],
            });
            if (!set.statuses)
                throw new Error('set.statuses must be not undefined');
            set.statuses = statuses;
            await this.repository.save(set);
        }
        async addDishToSelectedSets(dish, setIds) {
            const setsDB = await this.repository.findByIds(setIds, {
                relations: ['cuisine', 'dishes', 'dishes.ingredients', 'statuses'],
            });
            setsDB.forEach((setDB) => {
                if (!setDB.dishes)
                    throw new Error('set.dishes must be not undefined');
                setDB.dishes = [...setDB.dishes, dish];
            });
            await this.repository.save(setsDB);
        }
        async deleteDishFromSelectedSets(dish, setIds) {
            const setsDB = await this.repository.findByIds(setIds, {
                relations: ['cuisine', 'dishes', 'dishes.ingredients', 'statuses'],
            });
            setsDB.forEach((setDB) => {
                if (!setDB.dishes)
                    throw new Error('set.dishes must be not undefined');
                setDB.dishes = [...setDB.dishes.filter((setDish) => setDish.id !== dish.id)];
            });
            await this.repository.save(setsDB);
        }
        async distributeSetsOfWeek(setIdsAndDays) {
            const setIds = setIdsAndDays.map((item) => item.setId);
            const setsDB = await this.repository.findByIds(setIds, {
                relations: ['cuisine', 'dishes', 'dishes.ingredients', 'statuses'],
            });
            setsDB.forEach((setDB) => {
                setDB.day = setIdsAndDays.filter((item) => item.setId === setDB.id)[0].day || '';
            });
            await this.repository.save(setsDB);
        }
        async deleteSet(id) {
            await this.repository.delete({ id });
        }
    };
    SetStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Set_1.default)),
        __param(1, typeorm_1.InjectRepository(Cuisine_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository,
            ICuisineStore_1.default])
    ], SetStore);
    return SetStore;
})();
exports.default = SetStore;
//# sourceMappingURL=SetStore.js.map