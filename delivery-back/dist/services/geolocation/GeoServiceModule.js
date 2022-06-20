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
exports.GeoServiceModule = void 0;
const common_1 = require("@nestjs/common");
const IGeoService_1 = __importDefault(require("./IGeoService"));
const GeoService_1 = __importDefault(require("./GeoService"));
let GeoServiceModule = (() => {
    let GeoServiceModule = class GeoServiceModule {
    };
    GeoServiceModule = __decorate([
        common_1.Module({
            providers: [
                {
                    provide: IGeoService_1.default,
                    useClass: GeoService_1.default,
                },
            ],
            exports: [IGeoService_1.default],
        })
    ], GeoServiceModule);
    return GeoServiceModule;
})();
exports.GeoServiceModule = GeoServiceModule;
//# sourceMappingURL=GeoServiceModule.js.map