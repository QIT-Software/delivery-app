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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const ConfigModule_1 = require("../config/ConfigModule");
const IConfigService_1 = __importDefault(require("../config/IConfigService"));
const IFirebaseService_1 = __importDefault(require("./IFirebaseService"));
const FirebaseService_1 = __importDefault(require("./FirebaseService"));
const FirebaseAdmin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
const StoresModule_1 = require("../../database/stores/StoresModule");
const FileSystemUtils_1 = require("../../utils/FileSystemUtils");
let FirebaseModule = (() => {
    let FirebaseModule = class FirebaseModule {
        constructor(configService) {
            const certFile = configService.get('FIREBASE_CERT');
            const certFilePath = `${FileSystemUtils_1.getProjectRoot()}/${certFile}`;
            if (!fs.existsSync(certFilePath))
                throw new Error(`config file not exists at '${certFilePath}'`);
            FirebaseAdmin.initializeApp({
                credential: FirebaseAdmin.credential.cert(certFilePath),
            });
        }
    };
    FirebaseModule = __decorate([
        common_1.Module({
            imports: [
                ConfigModule_1.ConfigModule,
                StoresModule_1.StoresModule,
            ],
            providers: [
                {
                    provide: IFirebaseService_1.default,
                    useClass: FirebaseService_1.default,
                },
            ],
            exports: [IFirebaseService_1.default],
        }),
        __metadata("design:paramtypes", [IConfigService_1.default])
    ], FirebaseModule);
    return FirebaseModule;
})();
exports.FirebaseModule = FirebaseModule;
//# sourceMappingURL=FirebaseModule.js.map