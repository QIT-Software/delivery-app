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
const common_1 = require("@nestjs/common");
const Mappers_1 = require("../../database/entities/Mappers");
const IPreferencesStore_1 = __importDefault(require("../../database/stores/preferences/IPreferencesStore"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
let PreferencesManager = (() => {
    let PreferencesManager = class PreferencesManager {
        constructor(preferencesStore, userStore) {
            this.preferencesStore = preferencesStore;
            this.userStore = userStore;
        }
        async updatePreferences(userId, allowPushNotifications, allowEmailNotifications, allowSmsNotifications) {
            await this.preferencesStore.updatePreferences(userId, allowPushNotifications, allowEmailNotifications, allowSmsNotifications);
            return this.getPreferences(userId);
        }
        async getPreferences(id) {
            const user = await this.userStore.getUser(id);
            if (!user)
                throw new SpoonError_1.default('User not exist');
            const preferences = await this.preferencesStore.getPreferences(user === null || user === void 0 ? void 0 : user.preferencesId);
            if (!preferences)
                throw new SpoonError_1.default('Preferences not exist');
            return Mappers_1.mapPreferencesFromDb(preferences);
        }
    };
    PreferencesManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IPreferencesStore_1.default,
            IUserStore_1.default])
    ], PreferencesManager);
    return PreferencesManager;
})();
exports.default = PreferencesManager;
//# sourceMappingURL=PreferencesManager.js.map