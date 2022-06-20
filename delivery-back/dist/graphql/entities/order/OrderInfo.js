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
const Address_1 = __importDefault(require("../address/Address"));
let OrderInfo = (() => {
    let OrderInfo = class OrderInfo {
        constructor(id, clientAddress, distanceMiles, priceCents) {
            this.id = id;
            this.clientAddress = clientAddress;
            this.distanceMiles = distanceMiles;
            this.priceCents = priceCents;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], OrderInfo.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", Address_1.default)
    ], OrderInfo.prototype, "clientAddress", void 0);
    __decorate([
        graphql_1.Field({ nullable: true }),
        __metadata("design:type", Number)
    ], OrderInfo.prototype, "distanceMiles", void 0);
    __decorate([
        graphql_1.Field(() => graphql_1.Int),
        __metadata("design:type", Number)
    ], OrderInfo.prototype, "priceCents", void 0);
    OrderInfo = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, Address_1.default, Number, Number])
    ], OrderInfo);
    return OrderInfo;
})();
exports.default = OrderInfo;
//# sourceMappingURL=OrderInfo.js.map