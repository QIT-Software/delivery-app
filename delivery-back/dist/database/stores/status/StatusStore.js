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
const IStatusStore_1 = __importDefault(require("./IStatusStore"));
const typeorm_1 = require("@nestjs/typeorm");
const Status_1 = __importDefault(require("../../entities/Status"));
const typeorm_2 = require("typeorm");
const Set_1 = __importDefault(require("../../entities/Set"));
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
let StatusStore = (() => {
    let StatusStore = class StatusStore extends IStatusStore_1.default {
        constructor(repository, setRepository) {
            super();
            this.repository = repository;
            this.setRepository = setRepository;
        }
        async findStatusById(id) {
            return this.repository.findOne({
                where: { id },
            });
        }
        async findStatusByIdOrThrow(id) {
            return this.repository.findOneOrFail({
                where: { id },
            });
        }
        async getStatusesBySetIdOrFail(id) {
            const set = await this.setRepository.findOneOrFail(id, { relations: ['statuses'] });
            if (!set.statuses)
                throw new SpoonError_1.default('Set statuses not found');
            return set.statuses;
        }
        async getStatuses() {
            return this.repository.find();
        }
        async getSelectedStatuses(ids) {
            return this.repository.find({
                where: { id: typeorm_2.In(ids) },
            });
        }
        async updateStatus(id, imageId, name) {
            await this.repository.update(id, {
                imageId,
                name,
            });
            return this.findStatusByIdOrThrow(id);
        }
        async createStatus(imageId, name) {
            await this.repository.insert({ imageId, name });
        }
        async deleteStatus(id) {
            await this.repository.delete({ id });
        }
    };
    StatusStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Status_1.default)),
        __param(1, typeorm_1.InjectRepository(Set_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], StatusStore);
    return StatusStore;
})();
exports.default = StatusStore;
//# sourceMappingURL=StatusStore.js.map