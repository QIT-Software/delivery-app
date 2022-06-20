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
const common_1 = require("@nestjs/common");
const IEmailFroSpam_1 = __importDefault(require("./IEmailFroSpam"));
const CreateEmailForSpamRequest_1 = __importDefault(require("../../graphql/entities/emailForSpam/CreateEmailForSpamRequest"));
const IEmailForSpamStore_1 = __importDefault(require("../../database/stores/emailForSpam/IEmailForSpamStore"));
const EmailForSpam_1 = __importDefault(require("../../entities/EmailForSpam"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const Mappers_1 = require("../../database/entities/Mappers");
let EmailForSpam = (() => {
    let EmailForSpam = class EmailForSpam {
        constructor(emailForSpamStore) {
            this.emailForSpamStore = emailForSpamStore;
        }
        async createEmailForSpam(email) {
            await this.emailForSpamStore.createEmailForSpam(Object.assign({}, email));
        }
        async getEmailsForSpam() {
            const emails = await this.emailForSpamStore.getEmails();
            if (emails.length < 0)
                throw new SpoonError_1.default('no emails at the moment');
            return Mappers_1.mapEmailForSpamListFromDb(emails);
        }
    };
    EmailForSpam = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IEmailForSpamStore_1.default])
    ], EmailForSpam);
    return EmailForSpam;
})();
exports.default = EmailForSpam;
//# sourceMappingURL=EmailForSpam.js.map