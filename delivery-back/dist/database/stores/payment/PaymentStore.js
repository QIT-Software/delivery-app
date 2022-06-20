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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const IPaymentStore_1 = __importDefault(require("./IPaymentStore"));
const IncomePayment_1 = __importDefault(require("../../entities/IncomePayment"));
const RequestedIncomePayment_1 = __importDefault(require("../../entities/RequestedIncomePayment"));
let PaymentStore = (() => {
    let PaymentStore = class PaymentStore extends IPaymentStore_1.default {
        constructor(requestedIncomePaymentRepository, incomePaymentRepository) {
            super();
            this.requestedIncomePaymentRepository = requestedIncomePaymentRepository;
            this.incomePaymentRepository = incomePaymentRepository;
        }
        async createRequestedIncomePayment(paymentId) {
            const newPayment = this.requestedIncomePaymentRepository.create({
                payPalPaymentId: paymentId,
            });
            await this.requestedIncomePaymentRepository.insert(newPayment);
            await this.requestedIncomePaymentRepository.save(newPayment);
            return newPayment;
        }
        async createIncomePayment(requestedPayment) {
            const newPayment = await this.incomePaymentRepository.create({
                requestedPayment,
            });
            await this.incomePaymentRepository.insert(newPayment);
            await this.incomePaymentRepository.save(newPayment);
            return newPayment;
        }
    };
    PaymentStore = __decorate([
        __param(0, typeorm_1.InjectRepository(RequestedIncomePayment_1.default)),
        __param(1, typeorm_1.InjectRepository(IncomePayment_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], PaymentStore);
    return PaymentStore;
})();
exports.default = PaymentStore;
//# sourceMappingURL=PaymentStore.js.map