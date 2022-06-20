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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const Cart_1 = require("../../../entities/Cart");
graphql_1.registerEnumType(Cart_1.CartState, { name: 'CartState' });
let Cart = (() => {
    let Cart = class Cart {
        constructor(id, userId, status) {
            this.id = id;
            this.userId = userId;
            this.status = status;
        }
    };
    __decorate([
        graphql_1.Field(() => graphql_1.ID),
        __metadata("design:type", String)
    ], Cart.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Cart.prototype, "userId", void 0);
    __decorate([
        graphql_1.Field(() => Cart_1.CartState),
        __metadata("design:type", String)
    ], Cart.prototype, "status", void 0);
    Cart = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, String, String])
    ], Cart);
    return Cart;
})();
exports.default = Cart;
//# sourceMappingURL=Cart.js.map