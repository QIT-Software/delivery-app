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
exports.EmailForSpamResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const CreateEmailForSpamRequest_1 = __importDefault(require("../entities/emailForSpam/CreateEmailForSpamRequest"));
const IEmailFroSpam_1 = __importDefault(require("../../managers/emailForSpamManager/IEmailFroSpam"));
const Ignore_1 = __importDefault(require("../../enhancers/decorators/Ignore"));
const EmailForSpam_1 = __importDefault(require("../entities/emailForSpam/EmailForSpam"));
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
let EmailForSpamResolver = (() => {
    let EmailForSpamResolver = class EmailForSpamResolver {
        constructor(emailFroSpamManager) {
            this.emailFroSpamManager = emailFroSpamManager;
        }
        async createEmailForSpam(email) {
            await this.emailFroSpamManager.createEmailForSpam(email);
            return true;
        }
        async getEmailsForSpam() {
            return this.emailFroSpamManager.getEmailsForSpam();
        }
    };
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Ignore_1.default('Authorization'),
        __param(0, graphql_1.Args('email')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [CreateEmailForSpamRequest_1.default]),
        __metadata("design:returntype", Promise)
    ], EmailForSpamResolver.prototype, "createEmailForSpam", null);
    __decorate([
        graphql_1.Query(() => [EmailForSpam_1.default]),
        Roles_1.default('Client'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], EmailForSpamResolver.prototype, "getEmailsForSpam", null);
    EmailForSpamResolver = __decorate([
        graphql_1.Resolver(),
        __metadata("design:paramtypes", [IEmailFroSpam_1.default])
    ], EmailForSpamResolver);
    return EmailForSpamResolver;
})();
exports.EmailForSpamResolver = EmailForSpamResolver;
//# sourceMappingURL=EmailForSpamResolver.js.map