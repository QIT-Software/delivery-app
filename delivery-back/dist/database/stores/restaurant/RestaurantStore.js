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
const IRestaurantStore_1 = __importDefault(require("./IRestaurantStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Restaurant_1 = __importDefault(require("../../entities/Restaurant"));
const typeorm_2 = require("typeorm");
const Cuisine_1 = __importDefault(require("../../entities/Cuisine"));
const Address_1 = __importDefault(require("../../entities/Address"));
const User_1 = __importDefault(require("../../entities/User"));
const LocalLogin_1 = __importDefault(require("../../entities/LocalLogin"));
const ILoginStore_1 = __importDefault(require("../login/ILoginStore"));
let RestaurantStore = (() => {
    let RestaurantStore = class RestaurantStore extends IRestaurantStore_1.default {
        constructor(repository, userRepository, localLoginRepository, localLoginStore) {
            super();
            this.repository = repository;
            this.userRepository = userRepository;
            this.localLoginRepository = localLoginRepository;
            this.localLoginStore = localLoginStore;
            this.allRelations = [
                'user',
                'address',
                'cuisines',
            ];
        }
        async getRestaurantById(id) {
            return this.repository.findOneOrFail(id, {
                relations: this.allRelations,
            });
        }
        async getRestaurantByUserId(userId) {
            return this.repository.findOneOrFail({ user: { id: userId } }, { relations: ['user', 'address', 'cuisines'] });
        }
        async getRestaurants() {
            return this.repository.find({
                relations: this.allRelations,
            });
        }
        async createRestaurant(userId, imageId, title, description, address, cuisines) {
            const restaurant = await this.repository.create({
                userId,
                imageId,
                title,
                description,
                address,
            });
            await this.repository.insert(restaurant);
            await this.repository.save(restaurant);
            const restaurantFromDB = await this.getRestaurantById(restaurant.id);
            if (!restaurantFromDB.cuisines)
                throw new Error('restaurant.cuisines must be not undefined');
            restaurantFromDB.cuisines = cuisines;
            await this.repository.save(restaurantFromDB);
        }
        async updateRestaurant(id, imageId, title, description, address, cuisines) {
            await this.repository.update(id, {
                imageId,
                title,
                description,
                address,
            });
            const restaurant = await this.getRestaurantById(id);
            if (!restaurant.cuisines)
                throw new Error('restaurant.cuisines must be not undefined');
            restaurant.cuisines = cuisines;
            await this.repository.save(restaurant);
            return restaurant;
        }
        async deleteRestaurant(id) {
            const restaurant = await this.repository.findOneOrFail(id, { relations: ['user'] });
            const userId = restaurant.user && restaurant.user.id;
            await this.repository.delete({ id });
            if (userId) {
                const localLogin = await this.localLoginStore.getLocalLoginByUser({ id: userId });
                if (localLogin) {
                    await this.localLoginRepository.delete({ id: localLogin.id });
                    await this.userRepository.delete({ id: userId });
                }
            }
        }
    };
    RestaurantStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Restaurant_1.default)),
        __param(1, typeorm_1.InjectRepository(User_1.default)),
        __param(2, typeorm_1.InjectRepository(LocalLogin_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            ILoginStore_1.default])
    ], RestaurantStore);
    return RestaurantStore;
})();
exports.default = RestaurantStore;
//# sourceMappingURL=RestaurantStore.js.map