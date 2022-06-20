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
const ICuisineStore_1 = __importDefault(require("./ICuisineStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Cuisine_1 = __importDefault(require("../../entities/Cuisine"));
const typeorm_2 = require("typeorm");
const Restaurant_1 = __importDefault(require("../../entities/Restaurant"));
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
let CuisineStore = (() => {
    let CuisineStore = class CuisineStore extends ICuisineStore_1.default {
        constructor(repository, restaurant) {
            super();
            this.repository = repository;
            this.restaurant = restaurant;
        }
        async findCuisineById(id) {
            return this.repository.findOneOrFail(id);
        }
        async getCuisines() {
            return this.repository.find();
        }
        async getCuisinesByRestaurantId(id) {
            const restaurant = await this.restaurant.findOneOrFail(id, { relations: ['cuisines'] });
            if (!restaurant.cuisines)
                throw new SpoonError_1.default('Restaurant cuisines not found');
            return restaurant.cuisines;
        }
        async getCuisinesByIds(ids) {
            return this.repository.find({
                where: { id: typeorm_2.In(ids) },
            });
        }
        async updateCuisine(id, imageId, nationality) {
            await this.repository.update(id, {
                imageId,
                nationality,
            });
            return this.findCuisineById(id);
        }
        async createCuisine(imageId, nationality) {
            await this.repository.insert({ imageId, nationality });
        }
        async deleteCuisine(id) {
            await this.repository.delete({ id });
        }
    };
    CuisineStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Cuisine_1.default)),
        __param(1, typeorm_1.InjectRepository(Restaurant_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], CuisineStore);
    return CuisineStore;
})();
exports.default = CuisineStore;
//# sourceMappingURL=CuisineStore.js.map