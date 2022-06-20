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
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const Mappers_1 = require("../../database/entities/Mappers");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const IPreferencesStore_1 = __importDefault(require("../../database/stores/preferences/IPreferencesStore"));
let AccountManager = (() => {
    let AccountManager = class AccountManager {
        constructor(userStore, preferencesStore) {
            this.userStore = userStore;
            this.preferencesStore = preferencesStore;
        }
        async getMyAccount(myUserId) {
            const dbUser = await this.userStore.getUser(myUserId);
            if (!dbUser)
                throw new SpoonError_1.default('User is not found');
            const dbPreferences = await this.preferencesStore.getPreferences(dbUser.preferencesId);
            if (!dbPreferences)
                throw new SpoonError_1.default('Preferences is not found');
            return Mappers_1.mapAccountFromDB(dbUser, dbPreferences);
        }
        async updateAccount(myUserId, user) {
            await this.userStore.updateUser(myUserId, user);
            const dbUser = await this.userStore.getUser(myUserId);
            if (!dbUser)
                throw new SpoonError_1.default('User is not found');
            const dbPreferences = await this.preferencesStore.getPreferences(dbUser.preferencesId);
            if (!dbPreferences)
                throw new SpoonError_1.default('Preferences is not found');
            return Mappers_1.mapAccountFromDB(dbUser, dbPreferences);
        }
        async updateAccountImage(myUserId, image) {
            await this.userStore.updateUserImage(myUserId, image);
        }
    };
    AccountManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IUserStore_1.default,
            IPreferencesStore_1.default])
    ], AccountManager);
    return AccountManager;
})();
exports.default = AccountManager;
//# sourceMappingURL=AccountManager.js.map