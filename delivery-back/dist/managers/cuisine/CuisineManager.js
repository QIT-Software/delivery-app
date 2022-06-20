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
const ICuisineManager_1 = __importDefault(require("./ICuisineManager"));
const ICuisineStore_1 = __importDefault(require("../../database/stores/cuisine/ICuisineStore"));
const Cuisine_1 = __importDefault(require("../../entities/Cuisine"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const Common_1 = require("../../entities/Common");
let CuisineManager = (() => {
    let CuisineManager = class CuisineManager extends ICuisineManager_1.default {
        constructor(cuisineStore) {
            super();
            this.cuisineStore = cuisineStore;
        }
        async findCuisineByIdOrThrow(id) {
            const cuisine = await this.cuisineStore.findCuisineById(id);
            if (!cuisine)
                throw new SpoonError_1.default('Cuisine not found');
            return Mappers_1.mapCuisineFromDb(cuisine);
        }
        async getCuisines() {
            return Mappers_1.mapCuisinesFromDb(await this.cuisineStore.getCuisines());
        }
        async getCuisinesByRestaurantId(id) {
            const cuisines = await this.cuisineStore.getCuisinesByRestaurantId(id);
            return Mappers_1.mapCuisinesFromDb(cuisines);
        }
        async updateCuisine(id, imageId, nationality) {
            return Mappers_1.mapCuisineFromDb(await this.cuisineStore.updateCuisine(id, imageId, nationality));
        }
        async createCuisine(imageId, nationality) {
            return this.cuisineStore.createCuisine(imageId, nationality);
        }
        async deleteCuisine(cuisineId) {
            await this.cuisineStore.deleteCuisine(cuisineId);
        }
    };
    CuisineManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [ICuisineStore_1.default])
    ], CuisineManager);
    return CuisineManager;
})();
exports.default = CuisineManager;
//# sourceMappingURL=CuisineManager.js.map