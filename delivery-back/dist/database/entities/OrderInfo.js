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
const Address_1 = __importDefault(require("./Address"));
let OrderInfo = (() => {
    let OrderInfo = class OrderInfo {
        constructor(id, priceCents, distanceMiles, clientAddress) {
            this.id = id;
            this.priceCents = priceCents;
            this.distanceMiles = distanceMiles;
            this.clientAddress = clientAddress;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], OrderInfo.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], OrderInfo.prototype, "priceCents", void 0);
    __decorate([
        typeorm_1.Column('float', { nullable: true }),
        __metadata("design:type", Number)
    ], OrderInfo.prototype, "distanceMiles", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Address_1.default),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Address_1.default)
    ], OrderInfo.prototype, "clientAddress", void 0);
    OrderInfo = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, Number, Number, Address_1.default])
    ], OrderInfo);
    return OrderInfo;
})();
exports.default = OrderInfo;
//# sourceMappingURL=OrderInfo.js.map