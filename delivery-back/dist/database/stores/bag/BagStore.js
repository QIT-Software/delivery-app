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
const IBagStore_1 = __importDefault(require("./IBagStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Bag_1 = __importDefault(require("../../entities/Bag"));
const typeorm_2 = require("typeorm");
const Order_1 = __importDefault(require("../../entities/Order"));
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
let BagStore = (() => {
    let BagStore = class BagStore extends IBagStore_1.default {
        constructor(repository, order) {
            super();
            this.repository = repository;
            this.order = order;
        }
        async findBagByCode(code) {
            return this.repository.findOne({
                where: { code },
            });
        }
        async getBagByOrderIdOrFail(id) {
            const order = await this.order.findOneOrFail(id, { relations: ['bag'] });
            if (!order.bag)
                throw new SpoonError_1.default('Order bag not found');
            return order.bag;
        }
    };
    BagStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Bag_1.default)),
        __param(1, typeorm_1.InjectRepository(Order_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], BagStore);
    return BagStore;
})();
exports.default = BagStore;
//# sourceMappingURL=BagStore.js.map