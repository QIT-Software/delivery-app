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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const IEmailsForSpamStore_1 = __importDefault(require("./IEmailsForSpamStore"));
const Common_1 = require("../../../entities/Common");
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
const EmailsForSpam_1 = __importDefault(require("../../entities/EmailsForSpam"));
let EmailsForSpamStore = (() => {
    let EmailsForSpamStore = class EmailsForSpamStore {
        constructor(repository) {
            this.repository = repository;
        }
        async getEmailForSpam(id) {
            return this.repository.findOneOrFail({
                where: { id },
            });
        }
        async getEmailOrFail(id) {
            const email = await this.getEmailForSpam(id);
            if (!email)
                throw new SpoonError_1.default('Email not found');
            return email;
        }
        async createEmailForSpam(email) {
            const newEmail = this.repository.create(Object.assign({}, email));
            await this.repository.insert(newEmail);
            return newEmail;
        }
    };
    EmailsForSpamStore = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(EmailsForSpam_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], EmailsForSpamStore);
    return EmailsForSpamStore;
})();
exports.default = EmailsForSpamStore;
//# sourceMappingURL=EmailsForSpamStore.js.map