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
const ICartStore_1 = __importDefault(require("./ICartStore"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Cart_1 = __importDefault(require("../../entities/Cart"));
const Cart_2 = require("../../../entities/Cart");
let CartStore = (() => {
    let CartStore = class CartStore extends ICartStore_1.default {
        constructor(repository) {
            super();
            this.repository = repository;
        }
        async getCartByIdOrFail(id) {
            return this.repository.findOneOrFail(id);
        }
        async createCart(userId, status) {
            const newCart = this.repository.create({
                userId,
                status,
            });
            await this.repository.insert(newCart);
            await this.repository.save(newCart);
            return this.getCartByIdOrFail(newCart.id);
        }
        async getCartByUserId(userId) {
            return this.repository.findOneOrFail({
                where: { userId },
            });
        }
        async getCartsByUserId(userId) {
            return this.repository.find({
                where: { userId },
            });
        }
        async deleteCart(id) {
            await this.repository.delete({ id });
        }
    };
    CartStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Cart_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], CartStore);
    return CartStore;
})();
exports.default = CartStore;
//# sourceMappingURL=CartStore.js.map