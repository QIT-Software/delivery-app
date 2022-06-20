"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSenderModule = void 0;
const common_1 = require("@nestjs/common");
const IEmailSenderService_1 = require("./IEmailSenderService");
const EmailSenderService_1 = require("./EmailSenderService");
const mailer_1 = require("@nest-modules/mailer");
const fs = __importStar(require("fs"));
const IConfigService_1 = __importDefault(require("../config/IConfigService"));
const ConfigModule_1 = require("../config/ConfigModule");
const FileSystemUtils_1 = require("../../utils/FileSystemUtils");
let EmailSenderModule = (() => {
    let EmailSenderModule = class EmailSenderModule {
    };
    EmailSenderModule = __decorate([
        common_1.Module({
            imports: [
                mailer_1.MailerModule.forRootAsync({
                    imports: [ConfigModule_1.ConfigModule],
                    inject: [IConfigService_1.default],
                    useFactory: (configService) => {
                        const templates = configService.get('EMAIL_TEMPLATES');
                        const username = configService.get('EMAIL_SENDER_USERNAME');
                        const password = configService.get('EMAIL_SENDER_PASSWORD');
                        const host = configService.get('EMAIL_SMTP_HOST');
                        const from = configService.get('EMAIL_FROM');
                        const templatesDir = `${FileSystemUtils_1.getProjectRoot()}/${templates}`;
                        if (!fs.existsSync(templatesDir))
                            throw new Error(`templatesDir not exists at '${templatesDir}'`);
                        return {
                            transport: `smtp://${username}:${password}@${host}`,
                            defaults: {
                                from,
                            },
                            template: {
                                dir: templatesDir,
                                adapter: new mailer_1.HandlebarsAdapter(),
                                options: {
                                    strict: true,
                                },
                            },
                        };
                    },
                }),
            ],
            providers: [
                {
                    provide: IEmailSenderService_1.IEmailSenderService,
                    useClass: EmailSenderService_1.EmailSenderService,
                },
            ],
            exports: [
                IEmailSenderService_1.IEmailSenderService,
            ],
        })
    ], EmailSenderModule);
    return EmailSenderModule;
})();
exports.EmailSenderModule = EmailSenderModule;
//# sourceMappingURL=EmailSenderModule.js.map