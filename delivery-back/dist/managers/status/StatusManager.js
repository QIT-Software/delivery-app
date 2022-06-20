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
const IStatusManager_1 = __importDefault(require("./IStatusManager"));
const IStatusStore_1 = __importDefault(require("../../database/stores/status/IStatusStore"));
const Status_1 = __importDefault(require("../../entities/Status"));
const Mappers_1 = require("../../database/entities/Mappers");
const common_1 = require("@nestjs/common");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const Common_1 = require("../../entities/Common");
let StatusManager = (() => {
    let StatusManager = class StatusManager extends IStatusManager_1.default {
        constructor(statusStore) {
            super();
            this.statusStore = statusStore;
        }
        async findStatusByIdOrThrow(id) {
            const status = await this.statusStore.findStatusById(id);
            if (!status)
                throw new SpoonError_1.default('Status not found');
            return Mappers_1.mapStatusFromDb(status);
        }
        async getStatusesBySetId(id) {
            const statuses = await this.statusStore.getStatusesBySetIdOrFail(id);
            return Mappers_1.mapStatusesFromDb(statuses);
        }
        async getStatuses() {
            return Mappers_1.mapStatusesFromDb(await this.statusStore.getStatuses());
        }
        async updateStatus(id, imageId, name) {
            return Mappers_1.mapStatusFromDb(await this.statusStore.updateStatus(id, imageId, name));
        }
        async createStatus(imageId, name) {
            return this.statusStore.createStatus(imageId, name);
        }
        async deleteStatus(statusId) {
            await this.statusStore.deleteStatus(statusId);
        }
    };
    StatusManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IStatusStore_1.default])
    ], StatusManager);
    return StatusManager;
})();
exports.default = StatusManager;
//# sourceMappingURL=StatusManager.js.map