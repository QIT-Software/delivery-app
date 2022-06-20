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
const Order_1 = __importDefault(require("./Order"));
const Cart_1 = require("../../entities/Cart");
const User_1 = __importDefault(require("./User"));
let Cart = (() => {
    let Cart = class Cart {
        constructor(id, userId, status, orders) {
            this.id = id;
            this.userId = userId;
            this.status = status;
            this.orders = orders;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Cart.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Cart.prototype, "userId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => User_1.default, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.default)
    ], Cart.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Cart_1.CartState }),
        __metadata("design:type", String)
    ], Cart.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToMany(() => Order_1.default, (order) => order.cart.id, { nullable: false }),
        __metadata("design:type", Array)
    ], Cart.prototype, "orders", void 0);
    Cart = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, Array])
    ], Cart);
    return Cart;
})();
exports.default = Cart;
//# sourceMappingURL=Cart.js.map