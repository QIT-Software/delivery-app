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
const ISetManager_1 = __importDefault(require("./ISetManager"));
const ISetStore_1 = __importDefault(require("../../database/stores/set/ISetStore"));
const IDishStore_1 = __importDefault(require("../../database/stores/dish/IDishStore"));
const IStatusStore_1 = __importDefault(require("../../database/stores/status/IStatusStore"));
const Set_1 = __importDefault(require("../../entities/Set"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const SetIdAndDay_1 = __importDefault(require("../../entities/SetIdAndDay"));
const Common_1 = require("../../entities/Common");
let SetManager = (() => {
    let SetManager = class SetManager extends ISetManager_1.default {
        constructor(setStore, dishStore, statusStore) {
            super();
            this.setStore = setStore;
            this.dishStore = dishStore;
            this.statusStore = statusStore;
        }
        async findSetByIdOrThrow(id) {
            const set = await this.setStore.findSetById(id);
            if (!set)
                throw new SpoonError_1.default('Set not found');
            return Mappers_1.mapSetFromDb(set);
        }
        async getSetsByCuisineId(id) {
            const sets = await this.setStore.getCuisineSets(id);
            return Mappers_1.mapSetsFromDb(sets);
        }
        async getSets() {
            return Mappers_1.mapSetsFromDb(await this.setStore.getSets());
        }
        async getSetsByDishId(id) {
            return Mappers_1.mapSetsFromDb(await this.setStore.getSetsByDishId(id));
        }
        async updateSet(id, name, imageId, priceCents, cuisineId, dishes, statuses) {
            const selectedDishes = await this.dishStore.getSelectedDishes(dishes);
            await this.setStore.updateSetDishes(id, selectedDishes);
            const dishesDB = await this.dishStore.getDishesBySetIdOrFail(id);
            const selectedStatuses = await this.statusStore.getSelectedStatuses(statuses);
            await this.setStore.updateSetStatuses(id, selectedStatuses);
            const statusesDB = await this.statusStore.getStatusesBySetIdOrFail(id);
            return Mappers_1.mapSetFromDb(await this.setStore.updateSet(id, name, imageId, +priceCents, cuisineId, dishesDB, statusesDB));
        }
        async createSet(name, imageId, priceCents, cuisineId, dishes, statuses) {
            const selectedDishes = await this.dishStore.getSelectedDishes(dishes);
            const selectedStatuses = await this.statusStore.getSelectedStatuses(statuses);
            return this.setStore.createSet(name, imageId, +priceCents, cuisineId, selectedDishes, selectedStatuses);
        }
        async distributeSetsOfWeek(setIdsAndDays) {
            return this.setStore.distributeSetsOfWeek(setIdsAndDays);
        }
        async deleteSet(setId) {
            await this.setStore.deleteSet(setId);
        }
    };
    SetManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [ISetStore_1.default,
            IDishStore_1.default,
            IStatusStore_1.default])
    ], SetManager);
    return SetManager;
})();
exports.default = SetManager;
//# sourceMappingURL=SetManager.js.map