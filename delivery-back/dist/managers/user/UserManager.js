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
const IUserManager_1 = __importDefault(require("./IUserManager"));
const common_1 = require("@nestjs/common");
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const Mappers_1 = require("../../database/entities/Mappers");
const Common_1 = require("../../entities/Common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
let UserManager = (() => {
    let UserManager = class UserManager extends IUserManager_1.default {
        constructor(userStore) {
            super();
            this.userStore = userStore;
        }
        async updateClientInformation(id, name, email, phoneNumber) {
            await this.userStore.updateClientInformation(id, name, email, phoneNumber);
        }
        async updateCourierInformation(id, name, email, phoneNumber) {
            await this.userStore.updateCourierInformation(id, name, email, phoneNumber);
        }
        async getClientById(id) {
            const client = await this.userStore.getClientById(id);
            if (!client)
                throw new SpoonError_1.default('there is no such client');
            return Mappers_1.mapClientFromDb(client);
        }
        async getClients() {
            const clients = await this.userStore.getClients();
            if (clients.length < 0)
                throw new SpoonError_1.default('no clients');
            return Mappers_1.mapClientsFromDb(clients);
        }
        async getCourierById(id) {
            const courier = await this.userStore.getCourierById(id);
            if (!courier)
                throw new SpoonError_1.default('there is no such courier');
            return Mappers_1.mapCourierFromDb(courier);
        }
        async getCouriers() {
            const couriers = await this.userStore.getCouriers();
            if (couriers.length < 0)
                throw new SpoonError_1.default('no couriers');
            return Mappers_1.mapCouriersFromDb(couriers);
        }
    };
    UserManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IUserStore_1.default])
    ], UserManager);
    return UserManager;
})();
exports.default = UserManager;
//# sourceMappingURL=UserManager.js.map