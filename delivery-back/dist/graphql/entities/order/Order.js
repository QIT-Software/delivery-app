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
const graphql_1 = require("@nestjs/graphql");
const Bag_1 = __importDefault(require("../bag/Bag"));
const Set_1 = __importDefault(require("../set/Set"));
const User_1 = __importDefault(require("../user/User"));
const Restaurant_1 = __importDefault(require("../restaurant/Restaurant"));
const OrderInfo_1 = __importDefault(require("./OrderInfo"));
const Order_1 = require("../../../entities/Order");
const Courier_1 = __importDefault(require("../user/Courier"));
const Cart_1 = __importDefault(require("../cart/Cart"));
graphql_1.registerEnumType(Order_1.OrderState, { name: 'OrderState' });
graphql_1.registerEnumType(Order_1.OrderPlacement, { name: 'OrderPlacement' });
let Order = (() => {
    let Order = class Order {
        constructor(id, client, restaurant, cart, bag, set, number, orderInfo, created, placement, state, courierId, courier, date) {
            this.id = id;
            this.client = client;
            this.restaurant = restaurant;
            this.cart = cart;
            this.bag = bag;
            this.set = set;
            this.number = number;
            this.orderInfo = orderInfo;
            this.created = created;
            this.placement = placement;
            this.state = state;
            this.courierId = courierId;
            this.courier = courier;
            this.date = date;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], Order.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", User_1.default)
    ], Order.prototype, "client", void 0);
    __decorate([
        graphql_1.Field(() => Restaurant_1.default, { nullable: true }),
        __metadata("design:type", Restaurant_1.default)
    ], Order.prototype, "restaurant", void 0);
    __decorate([
        graphql_1.Field(() => Cart_1.default, { nullable: false }),
        __metadata("design:type", Cart_1.default)
    ], Order.prototype, "cart", void 0);
    __decorate([
        graphql_1.Field(() => Bag_1.default, { nullable: true }),
        __metadata("design:type", Bag_1.default)
    ], Order.prototype, "bag", void 0);
    __decorate([
        graphql_1.Field(() => Set_1.default),
        __metadata("design:type", Set_1.default)
    ], Order.prototype, "set", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", Number)
    ], Order.prototype, "number", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", OrderInfo_1.default)
    ], Order.prototype, "orderInfo", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", Date)
    ], Order.prototype, "created", void 0);
    __decorate([
        graphql_1.Field(() => Order_1.OrderPlacement),
        __metadata("design:type", String)
    ], Order.prototype, "placement", void 0);
    __decorate([
        graphql_1.Field(() => Order_1.OrderState),
        __metadata("design:type", String)
    ], Order.prototype, "state", void 0);
    __decorate([
        graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "courierId", void 0);
    __decorate([
        graphql_1.Field(() => Courier_1.default, { nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "courier", void 0);
    __decorate([
        graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "rating", void 0);
    __decorate([
        graphql_1.Field(() => Date),
        __metadata("design:type", Date)
    ], Order.prototype, "date", void 0);
    Order = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, User_1.default,
            Restaurant_1.default,
            Cart_1.default,
            Bag_1.default,
            Set_1.default, Number, OrderInfo_1.default,
            Date, String, String, Object, Object, Date])
    ], Order);
    return Order;
})();
exports.default = Order;
//# sourceMappingURL=Order.js.map