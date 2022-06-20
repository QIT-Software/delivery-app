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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const DocumentsRevision_1 = __importDefault(require("../../entities/DocumentsRevision"));
const Document_1 = require("../../../entities/Document");
const Common_1 = require("../../../entities/Common");
const Document_2 = __importDefault(require("../../entities/Document"));
const Courier_1 = __importDefault(require("../../entities/Courier"));
let CourierStore = (() => {
    let CourierStore = class CourierStore {
        constructor(repository, documentRevisionRepository, courierRepository) {
            this.repository = repository;
            this.documentRevisionRepository = documentRevisionRepository;
            this.courierRepository = courierRepository;
        }
        async getDocuments(revisionId) {
            return this.repository.find({
                where: { revision: { id: revisionId } },
            });
        }
        async addDocument(revisionId, file, group) {
            const document = this.repository.create({
                file,
                group,
                revision: { id: revisionId },
            });
            this.repository.insert(document);
            return document;
        }
        async deleteDocument(id) {
            await this.repository.delete({ id });
        }
        async findDocumentById(id) {
            return this.repository.findOne(id, {
                relations: ['revision', 'revision.courier'],
            });
        }
        async requestDocumentsRevisionVerification(revisionId, status) {
            await this.documentRevisionRepository.update(revisionId, { status });
        }
        async evaluateRevision(revisionId, status, comment) {
            await this.documentRevisionRepository.update(revisionId, { status, comment });
        }
        async createDocumentsRevisionIfNotExists(courierId) {
            const courier = await this.courierRepository.findOneOrFail(courierId);
            if (!courier.revisionId) {
                const revision = this.documentRevisionRepository.create({
                    status: Document_1.DocumentsRevisionStatus.New,
                    courier,
                });
                await this.documentRevisionRepository.insert(revision);
                await this.courierRepository.update(courierId, { revision });
            }
        }
    };
    CourierStore = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(Document_2.default)),
        __param(1, typeorm_1.InjectRepository(DocumentsRevision_1.default)),
        __param(2, typeorm_1.InjectRepository(Courier_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository])
    ], CourierStore);
    return CourierStore;
})();
exports.default = CourierStore;
//# sourceMappingURL=DocumentStore.js.map