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
exports.PreferencesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const IPreferencesManager_1 = __importDefault(require("../../managers/preferences/IPreferencesManager"));
const Preferences_1 = __importDefault(require("../entities/user/Preferences"));
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Mappers_1 = require("../entities/Mappers");
let PreferencesResolver = (() => {
    let PreferencesResolver = class PreferencesResolver {
        constructor(preferencesManager) {
            this.preferencesManager = preferencesManager;
        }
        async updatePreferences({ userId }, allowPushNotifications, allowEmailNotifications, allowSmsNotifications) {
            return this.preferencesManager.updatePreferences(userId, allowPushNotifications, allowEmailNotifications, allowSmsNotifications);
        }
        async preferences({ userId }) {
            return Mappers_1.mapPreferencesToGQL(await this.preferencesManager.getPreferences(userId));
        }
    };
    __decorate([
        graphql_1.Mutation(() => Preferences_1.default),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('allowPushNotifications', { nullable: true })),
        __param(2, graphql_1.Args('allowEmailNotifications', { nullable: true })),
        __param(3, graphql_1.Args('allowSmsNotifications', { nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Boolean, Boolean, Boolean]),
        __metadata("design:returntype", Promise)
    ], PreferencesResolver.prototype, "updatePreferences", null);
    __decorate([
        graphql_1.Query(() => Preferences_1.default),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PreferencesResolver.prototype, "preferences", null);
    PreferencesResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IPreferencesManager_1.default])
    ], PreferencesResolver);
    return PreferencesResolver;
})();
exports.PreferencesResolver = PreferencesResolver;
//# sourceMappingURL=PreferencesResolver.js.map