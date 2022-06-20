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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const IPreferencesStore_1 = __importDefault(require("./IPreferencesStore"));
const Common_1 = require("../../../entities/Common");
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
const Preferences_1 = __importDefault(require("../../entities/Preferences"));
const User_1 = __importDefault(require("../../entities/User"));
let PreferencesStore = (() => {
    let PreferencesStore = class PreferencesStore extends IPreferencesStore_1.default {
        constructor(repository, userRepository) {
            super();
            this.repository = repository;
            this.userRepository = userRepository;
        }
        async createPreferences(allowPushNotifications, allowEmailNotifications, allowSmsNotifications) {
            const preferences = await this.repository.create({
                allowPushNotifications,
                allowEmailNotifications,
                allowSmsNotifications,
            });
            await this.repository.insert(preferences);
            return preferences;
        }
        async getPreferences(id) {
            return this.repository.findOne(id);
        }
        async updatePreferences(userId, allowPushNotifications, allowEmailNotifications, allowSmsNotifications) {
            const user = await this.userRepository.findOne(userId);
            if (!user)
                throw new SpoonError_1.default('User not exists');
            if (allowPushNotifications !== undefined) {
                await this.repository.update(user.preferencesId, {
                    allowPushNotifications,
                });
            }
            if (allowEmailNotifications !== undefined) {
                await this.repository.update(user.preferencesId, {
                    allowEmailNotifications,
                });
            }
            if (allowSmsNotifications !== undefined) {
                await this.repository.update(user.preferencesId, {
                    allowSmsNotifications,
                });
            }
            return this.getPreferencesOrFail(user === null || user === void 0 ? void 0 : user.preferencesId);
        }
        async getPreferencesOrFail(preferencesId) {
            const preferences = await this.getPreferences(preferencesId);
            if (!preferences)
                throw new SpoonError_1.default('Preferences not exists');
            return preferences;
        }
    };
    PreferencesStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Preferences_1.default)),
        __param(1, typeorm_1.InjectRepository(User_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], PreferencesStore);
    return PreferencesStore;
})();
exports.default = PreferencesStore;
//# sourceMappingURL=PreferencesStore.js.map