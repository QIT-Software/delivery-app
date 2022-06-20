"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRoadsModule = void 0;
const common_1 = require("@nestjs/common");
const ConfigModule_1 = require("../config/ConfigModule");
const IConfigService_1 = __importDefault(require("../config/IConfigService"));
const IRoadsService_1 = __importDefault(require("./IRoadsService"));
const RoadService_1 = __importDefault(require("./RoadService"));
const maps_1 = require("@google/maps");
let GoogleRoadsModule = (() => {
    let GoogleRoadsModule = class GoogleRoadsModule {
    };
    GoogleRoadsModule = __decorate([
        common_1.Module({
            imports: [ConfigModule_1.ConfigModule],
            providers: [
                {
                    inject: [IConfigService_1.default],
                    provide: IRoadsService_1.default,
                    useFactory: async (configService) => {
                        return new RoadService_1.default(maps_1.createClient({
                            key: configService.get('GOOGLE_DIRECTIONS_API_KEY'),
                            Promise,
                        }));
                    },
                },
            ],
            exports: [IRoadsService_1.default],
        })
    ], GoogleRoadsModule);
    return GoogleRoadsModule;
})();
exports.GoogleRoadsModule = GoogleRoadsModule;
//# sourceMappingURL=GoogleRoadsModule.js.map