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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Preferences = (() => {
    let Preferences = class Preferences {
        constructor(id, allowPushNotifications, allowEmailNotifications, allowSmsNotifications) {
            this.id = id;
            this.allowPushNotifications = allowPushNotifications;
            this.allowEmailNotifications = allowEmailNotifications;
            this.allowSmsNotifications = allowSmsNotifications;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Preferences.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Preferences.prototype, "allowPushNotifications", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Preferences.prototype, "allowEmailNotifications", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Preferences.prototype, "allowSmsNotifications", void 0);
    Preferences = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, Boolean, Boolean, Boolean])
    ], Preferences);
    return Preferences;
})();
exports.default = Preferences;
//# sourceMappingURL=Preferences.js.map