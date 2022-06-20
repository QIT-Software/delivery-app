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
const typeorm_1 = require("typeorm");
const Restaurant_1 = __importDefault(require("./Restaurant"));
const Bag_1 = __importDefault(require("./Bag"));
const Cart_1 = __importDefault(require("./Cart"));
const Set_1 = __importDefault(require("./Set"));
const Client_1 = __importDefault(require("./Client"));
const Courier_1 = __importDefault(require("./Courier"));
const Order_1 = require("../../entities/Order");
const OrderMark_1 = __importDefault(require("./OrderMark"));
const OrderInfo_1 = __importDefault(require("./OrderInfo"));
let Order = (() => {
    let Order = class Order {
        constructor(id, number, bag, cart, cartId, set, orderInfo, state, created, client, clientId, courier, courierId, restaurant, restaurantId, placement, rating, clientCheckout, courierCheckin, courierCheckout, restaurantCheckout, date) {
            this.id = id;
            this.number = number;
            this.bag = bag;
            this.cart = cart;
            this.cartId = cartId;
            this.set = set;
            this.orderInfo = orderInfo;
            this.state = state;
            this.created = created;
            this.client = client;
            this.clientId = clientId;
            this.courier = courier;
            this.courierId = courierId;
            this.restaurant = restaurant;
            this.restaurantId = restaurantId;
            this.placement = placement;
            this.rating = rating;
            this.clientCheckout = clientCheckout;
            this.courierCheckin = courierCheckin;
            this.courierCheckout = courierCheckout;
            this.restaurantCheckout = restaurantCheckout;
            this.date = date;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Order.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], Order.prototype, "number", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Bag_1.default, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Bag_1.default)
    ], Order.prototype, "bag", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Cart_1.default, (cart) => cart.id, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Cart_1.default)
    ], Order.prototype, "cart", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "cartId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Set_1.default, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Set_1.default)
    ], Order.prototype, "set", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => OrderInfo_1.default, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", OrderInfo_1.default)
    ], Order.prototype, "orderInfo", void 0);
    __decorate([
        typeorm_1.Column('enum', { enum: Order_1.OrderState }),
        __metadata("design:type", String)
    ], Order.prototype, "state", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Order.prototype, "created", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Client_1.default, { nullable: false }),
        __metadata("design:type", Client_1.default)
    ], Order.prototype, "client", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "clientId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Courier_1.default, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Courier_1.default)
    ], Order.prototype, "courier", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "courierId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Restaurant_1.default, { nullable: true }),
        __metadata("design:type", Restaurant_1.default)
    ], Order.prototype, "restaurant", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "restaurantId", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Order_1.OrderPlacement }),
        __metadata("design:type", String)
    ], Order.prototype, "placement", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Order.prototype, "rating", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => OrderMark_1.default, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", OrderMark_1.default)
    ], Order.prototype, "clientCheckout", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => OrderMark_1.default, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", OrderMark_1.default)
    ], Order.prototype, "courierCheckin", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => OrderMark_1.default, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", OrderMark_1.default)
    ], Order.prototype, "courierCheckout", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => OrderMark_1.default, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", OrderMark_1.default)
    ], Order.prototype, "restaurantCheckout", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Order.prototype, "date", void 0);
    Order = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, Number, Bag_1.default,
            Cart_1.default, String, Set_1.default,
            OrderInfo_1.default, String, Date,
            Client_1.default, String, Courier_1.default, String, Restaurant_1.default, String, String, Number, OrderMark_1.default,
            OrderMark_1.default,
            OrderMark_1.default,
            OrderMark_1.default,
            Date])
    ], Order);
    return Order;
})();
exports.default = Order;
//# sourceMappingURL=Order.js.map