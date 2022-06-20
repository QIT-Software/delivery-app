"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const ConfigModule_1 = require("./config/ConfigModule");
const StorageModule_1 = require("./storage/StorageModule");
let ServicesModule = (() => {
    let ServicesModule = class ServicesModule {
    };
    ServicesModule = __decorate([
        common_1.Module({
            imports: [
                ConfigModule_1.ConfigModule,
                StorageModule_1.StorageModule,
            ],
            providers: [],
            exports: [
                ConfigModule_1.ConfigModule,
                StorageModule_1.StorageModule,
            ],
        })
    ], ServicesModule);
    return ServicesModule;
})();
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=ServicesModule.js.map