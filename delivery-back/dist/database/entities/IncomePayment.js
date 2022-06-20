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
const RequestedIncomePayment_1 = __importDefault(require("./RequestedIncomePayment"));
let IncomePayment = (() => {
    let IncomePayment = class IncomePayment {
        constructor(id, created, requestedPayment) {
            this.id = id;
            this.created = created;
            this.requestedPayment = requestedPayment;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], IncomePayment.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], IncomePayment.prototype, "created", void 0);
    __decorate([
        typeorm_1.OneToOne(() => RequestedIncomePayment_1.default, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", RequestedIncomePayment_1.default)
    ], IncomePayment.prototype, "requestedPayment", void 0);
    IncomePayment = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, Date, RequestedIncomePayment_1.default])
    ], IncomePayment);
    return IncomePayment;
})();
exports.default = IncomePayment;
//# sourceMappingURL=IncomePayment.js.map