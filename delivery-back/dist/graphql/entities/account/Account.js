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
const graphql_1 = require("@nestjs/graphql");
const User_1 = __importDefault(require("../user/User"));
const AdditionalUserInfo_1 = __importDefault(require("../user/AdditionalUserInfo"));
const Preferences_1 = __importDefault(require("../user/Preferences"));
let Account = (() => {
    let Account = class Account {
        constructor(user, info, preferences) {
            this.user = user;
            this.info = info;
            this.preferences = preferences;
        }
    };
    __decorate([
        graphql_1.Field(() => User_1.default),
        __metadata("design:type", User_1.default)
    ], Account.prototype, "user", void 0);
    __decorate([
        graphql_1.Field(() => AdditionalUserInfo_1.default),
        __metadata("design:type", AdditionalUserInfo_1.default)
    ], Account.prototype, "info", void 0);
    __decorate([
        graphql_1.Field(() => Preferences_1.default),
        __metadata("design:type", Preferences_1.default)
    ], Account.prototype, "preferences", void 0);
    Account = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [User_1.default, AdditionalUserInfo_1.default, Preferences_1.default])
    ], Account);
    return Account;
})();
exports.default = Account;
//# sourceMappingURL=Account.js.map