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
const Payment_1 = require("../../../entities/Payment");
graphql_1.registerEnumType(Payment_1.RequestedPaymentStatus, { name: 'RequestedPaymentStatus' });
let RequestedPayment = (() => {
    let RequestedPayment = class RequestedPayment {
        constructor(orderId, redirectUrl, status) {
            this.orderId = orderId;
            this.redirectUrl = redirectUrl;
            this.status = status;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], RequestedPayment.prototype, "orderId", void 0);
    __decorate([
        graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", Object)
    ], RequestedPayment.prototype, "redirectUrl", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", Number)
    ], RequestedPayment.prototype, "status", void 0);
    RequestedPayment = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, String, Number])
    ], RequestedPayment);
    return RequestedPayment;
})();
exports.default = RequestedPayment;
//# sourceMappingURL=RequestedPayment.js.map