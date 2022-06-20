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
exports.RouterModule = void 0;
const common_1 = require("@nestjs/common");
const IRouter_1 = __importDefault(require("./IRouter"));
const Router_1 = __importDefault(require("./Router"));
const ConfigModule_1 = require("../services/config/ConfigModule");
let RouterModule = (() => {
    let RouterModule = class RouterModule {
    };
    RouterModule = __decorate([
        common_1.Module({
            imports: [
                ConfigModule_1.ConfigModule,
            ],
            providers: [
                {
                    provide: IRouter_1.default,
                    useClass: Router_1.default,
                },
            ],
            exports: [
                IRouter_1.default,
            ],
        })
    ], RouterModule);
    return RouterModule;
})();
exports.RouterModule = RouterModule;
//# sourceMappingURL=RouterModule.js.map