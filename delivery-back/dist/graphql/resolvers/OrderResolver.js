"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const IOrderManager_1 = __importDefault(require("../../managers/order/IOrderManager"));
const Order_1 = __importDefault(require("../entities/order/Order"));
const Mappers_1 = require("../entities/Mappers");
const Session_1 = __importDefault(require("../../entities/Session"));
const CreateAddressRequest_1 = __importDefault(require("../entities/address/CreateAddressRequest"));
const Order_2 = require("../../entities/Order");
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const HttpRequest_1 = __importStar(require("../../enhancers/decorators/HttpRequest"));
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
let OrderResolver = (() => {
    let OrderResolver = class OrderResolver {
        constructor(orderManager) {
            this.orderManager = orderManager;
        }
        async createOrder({ userId }, clientAddress, setId, cartId, restaurantId, numberOfDays) {
            return Mappers_1.mapOrderToGQL(await this.orderManager.createOrder(cartId, userId, setId, clientAddress, restaurantId, numberOfDays));
        }
        async getOrders() {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrders());
        }
        async orderById(orderId) {
            return Mappers_1.mapOrderToGQL(await this.orderManager.getOrderById(orderId));
        }
        async orderState(orderId) {
            return (await this.orderManager.getOrderById(orderId)).state;
        }
        async ordersForDelivery({ appType }) {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrdersForDelivery(appType));
        }
        async getOrderHistory({ userId }, { appType }) {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrderHistory(userId, appType));
        }
        async evaluateOrder({ userId }, { appType }, orderId, rating) {
            await this.orderManager.evaluateOrder(appType, userId, orderId, rating);
            return true;
        }
        async acceptOrder({ userId }, id) {
            await this.orderManager.acceptOrder(userId, id);
            return true;
        }
        async markOrder({ appType }, orderId, bagId) {
            await this.orderManager.markOrder(appType, orderId, bagId);
            return true;
        }
        async deleteOrder({ userId }, orderId, { appType }) {
            await this.orderManager.deleteOrder(userId, orderId, appType);
            return true;
        }
        async currentOrder({ userId }, { appType }) {
            const order = await this.orderManager.getCurrentOrder(userId, appType);
            return !order ? order : Mappers_1.mapOrderToGQL(order);
        }
        async removeTheCurrentCourier(orderId) {
            await this.orderManager.removeTheCurrentCourier(orderId);
            return true;
        }
        async ordersByUserId({ userId }) {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrdersByUserId(userId));
        }
        async ordersByCartId(id) {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrdersByCartId(id));
        }
        async ordersByCourierId({ userId }) {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrdersByCourierId(userId));
        }
        async ordersByRestaurantId({ userId }) {
            return Mappers_1.mapOrdersToGQL(await this.orderManager.getOrdersByRestaurantId(userId));
        }
    };
    __decorate([
        graphql_1.Mutation(() => Order_1.default),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('clientAddress')),
        __param(2, graphql_1.Args('setId')),
        __param(3, graphql_1.Args('cartId')),
        __param(4, graphql_1.Args('restaurantId')),
        __param(5, graphql_1.Args('numberOfDays')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, CreateAddressRequest_1.default, String, String, String, Number]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "createOrder", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default], { name: 'orders' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "getOrders", null);
    __decorate([
        graphql_1.Query(() => Order_1.default),
        __param(0, graphql_1.Args({ name: 'id', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "orderById", null);
    __decorate([
        graphql_1.Query(() => Order_2.OrderState),
        __param(0, graphql_1.Args({ name: 'id', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "orderState", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default], { name: 'ordersForDelivery' }),
        Roles_1.default('Courier'),
        __param(0, HttpRequest_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "ordersForDelivery", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default], { name: 'orderHistory' }),
        __param(0, CurrentSession_1.default()),
        __param(1, HttpRequest_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "getOrderHistory", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Client'),
        __param(0, CurrentSession_1.default()),
        __param(1, HttpRequest_1.default()),
        __param(2, graphql_1.Args({ name: 'id', type: () => String })),
        __param(3, graphql_1.Args({ name: 'rating', type: () => Number })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, String, Number]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "evaluateOrder", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Courier'),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "acceptOrder", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        __param(0, HttpRequest_1.default()),
        __param(1, graphql_1.Args('orderId')),
        __param(2, graphql_1.Args('bagId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "markOrder", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args({ name: 'orderId', type: () => graphql_1.ID })),
        __param(2, HttpRequest_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "deleteOrder", null);
    __decorate([
        graphql_1.Query(() => Order_1.default, { nullable: true }),
        __param(0, CurrentSession_1.default()),
        __param(1, HttpRequest_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "currentOrder", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'orderId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "removeTheCurrentCourier", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default]),
        Roles_1.default('Client'),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "ordersByUserId", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default]),
        __param(0, graphql_1.Args({ name: 'id', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "ordersByCartId", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default]),
        Roles_1.default('Courier'),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "ordersByCourierId", null);
    __decorate([
        graphql_1.Query(() => [Order_1.default]),
        Roles_1.default('Restaurant'),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], OrderResolver.prototype, "ordersByRestaurantId", null);
    OrderResolver = __decorate([
        graphql_1.Resolver(Order_1.default),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IOrderManager_1.default])
    ], OrderResolver);
    return OrderResolver;
})();
exports.default = OrderResolver;
//# sourceMappingURL=OrderResolver.js.map