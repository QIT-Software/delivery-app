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
const IBagManager_1 = __importDefault(require("./IBagManager"));
const IBagStore_1 = __importDefault(require("../../database/stores/bag/IBagStore"));
const Bag_1 = __importDefault(require("../../entities/Bag"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
let BagManager = (() => {
    let BagManager = class BagManager extends IBagManager_1.default {
        constructor(bagStore) {
            super();
            this.bagStore = bagStore;
        }
        async findBagByCodeOrThrow(code) {
            const bag = await this.bagStore.findBagByCode(code);
            if (!bag)
                throw new SpoonError_1.default('Bag not found');
            return Mappers_1.mapBagFromDb(bag);
        }
        async getBagByOrderId(id) {
            const bag = await this.bagStore.getBagByOrderIdOrFail(id);
            return Mappers_1.mapBagFromDb(bag);
        }
    };
    BagManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IBagStore_1.default])
    ], BagManager);
    return BagManager;
})();
exports.default = BagManager;
//# sourceMappingURL=BagManager.js.map