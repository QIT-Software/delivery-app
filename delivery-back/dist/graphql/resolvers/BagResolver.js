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
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const IBagManager_1 = __importDefault(require("../../managers/bag/IBagManager"));
const Bag_1 = __importDefault(require("../entities/bag/Bag"));
const Mappers_1 = require("../entities/Mappers");
let BagResolver = (() => {
    let BagResolver = class BagResolver {
        constructor(bagManager) {
            this.bagManager = bagManager;
        }
        async bagByCode(code) {
            return Mappers_1.mapBagToGQL(await this.bagManager.findBagByCodeOrThrow(code));
        }
        async bagByOrderId(id) {
            return Mappers_1.mapBagToGQL(await this.bagManager.getBagByOrderId(id));
        }
    };
    __decorate([
        graphql_1.Query(() => Bag_1.default),
        __param(0, graphql_1.Args({ name: 'code', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BagResolver.prototype, "bagByCode", null);
    __decorate([
        graphql_1.Query(() => Bag_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BagResolver.prototype, "bagByOrderId", null);
    BagResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IBagManager_1.default])
    ], BagResolver);
    return BagResolver;
})();
exports.default = BagResolver;
//# sourceMappingURL=BagResolver.js.map