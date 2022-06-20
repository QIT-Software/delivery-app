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
const ICartManager_1 = __importDefault(require("../../managers/cart/ICartManager"));
const Cart_1 = __importDefault(require("../entities/cart/Cart"));
const Session_1 = __importDefault(require("../../entities/Session"));
const CreateAddressRequest_1 = __importDefault(require("../entities/address/CreateAddressRequest"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const SelectedSetInfo_1 = __importDefault(require("../entities/selectedSetInfo/SelectedSetInfo"));
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const Mappers_1 = require("../entities/Mappers");
let CartResolver = (() => {
    let CartResolver = class CartResolver {
        constructor(cartManager) {
            this.cartManager = cartManager;
        }
        async createCartAndDistributeOrders({ userId }, clientAddress, selectedSetsInfo) {
            return this.cartManager.createCartAndDistributeOrders(userId, clientAddress, selectedSetsInfo);
        }
        async cartsByUserId({ userId }) {
            return Mappers_1.mapCartsToGQL(await this.cartManager.getCartsByUserId(userId));
        }
    };
    __decorate([
        graphql_1.Mutation(() => Cart_1.default),
        Roles_1.default('Client'),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('clientAddress')),
        __param(2, graphql_1.Args({ name: 'selectedSetsInfo', type: () => [SelectedSetInfo_1.default] })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, CreateAddressRequest_1.default, Array]),
        __metadata("design:returntype", Promise)
    ], CartResolver.prototype, "createCartAndDistributeOrders", null);
    __decorate([
        graphql_1.Query(() => [Cart_1.default]),
        Roles_1.default('Client'),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CartResolver.prototype, "cartsByUserId", null);
    CartResolver = __decorate([
        graphql_1.Resolver(Cart_1.default),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [ICartManager_1.default])
    ], CartResolver);
    return CartResolver;
})();
exports.default = CartResolver;
//# sourceMappingURL=CartResolver.js.map