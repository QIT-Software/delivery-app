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
const IDocumentManager_1 = __importDefault(require("./IDocumentManager"));
const IDocumentStore_1 = __importDefault(require("../../database/stores/document/IDocumentStore"));
const Document_1 = require("../../entities/Document");
const Mappers_1 = require("../../database/entities/Mappers");
const Common_1 = require("../../entities/Common");
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const INotificationService_1 = __importDefault(require("../../services/notification/INotificationService"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
let DocumentManager = (() => {
    let DocumentManager = class DocumentManager {
        constructor(documentStore, userStore, notificationService) {
            this.documentStore = documentStore;
            this.userStore = userStore;
            this.notificationService = notificationService;
            this.checkCanUpdateRevision = (revision) => {
                if (revision.status !== Document_1.DocumentsRevisionStatus.New &&
                    revision.status !== Document_1.DocumentsRevisionStatus.ChangesRequested &&
                    revision.status !== Document_1.DocumentsRevisionStatus.Rejected) {
                    throw new SpoonError_1.default(`Bad revision status: ${revision.status}`);
                }
            };
        }
        async getCurrentRevision(userId) {
            const courier = await this.userStore.getCourierByUserIdOrThrow(userId);
            return courier.revision ? Mappers_1.mapDocumentRevisionFromDb(courier.revision) : undefined;
        }
        async getDocuments(revisionId) {
            return Mappers_1.mapDocumentsFromDb(await this.documentStore.getDocuments(revisionId));
        }
        async addDocument(userId, fileId, group) {
            const courier = Mappers_1.mapCourierFromDb(await this.userStore.getCourierByUserIdOrThrow(userId));
            const { revision } = courier;
            if (!revision)
                throw new SpoonError_1.default('Revision not exists');
            this.checkCanUpdateRevision(revision);
            return Mappers_1.mapDocumentFromDb(await this.documentStore.addDocument(revision.id, { id: fileId }, group));
        }
        async deleteDocument(userId, documentId) {
            const dbDocument = await this.documentStore.findDocumentById(documentId);
            if (!dbDocument)
                throw new SpoonError_1.default('Document not exists');
            const courier = Mappers_1.mapCourierFromDb(await this.userStore.getCourierByUserIdOrThrow(userId));
            if (!courier)
                throw new SpoonError_1.default('Courier is not found');
            const { revision } = courier;
            if (!revision)
                throw new SpoonError_1.default('Courier revision is not found');
            this.checkCanUpdateRevision(revision);
            await this.documentStore.deleteDocument(documentId);
        }
        async evaluateRevision(courierId, type, comment) {
            const courier = Mappers_1.mapCourierFromDb(await this.userStore.getCourierByIdOrThrow(courierId));
            const { revision } = courier;
            if (!revision)
                throw new SpoonError_1.default('Courier revision is not found');
            if (revision.status !== Document_1.DocumentsRevisionStatus.VerificationRequested &&
                revision.status !== Document_1.DocumentsRevisionStatus.ChangesRequested &&
                revision.status !== Document_1.DocumentsRevisionStatus.Approved &&
                revision.status !== Document_1.DocumentsRevisionStatus.Rejected) {
                throw new SpoonError_1.default(`Bad revision status: ${revision.status}`);
            }
            const status = (() => {
                switch (type) {
                    case Document_1.EvaluateDocumentsRevisionType.Approve:
                        return Document_1.DocumentsRevisionStatus.Approved;
                    case Document_1.EvaluateDocumentsRevisionType.RequestChanges:
                        return Document_1.DocumentsRevisionStatus.ChangesRequested;
                    case Document_1.EvaluateDocumentsRevisionType.Reject:
                        return Document_1.DocumentsRevisionStatus.Rejected;
                }
            })();
            await this.documentStore.evaluateRevision(revision.id, status, comment);
            await this.notificationService.sendDocumentsRevisionEvaluated(courier, status, comment);
        }
        async requestRevisionVerification(userId, revisionId) {
            const courier = Mappers_1.mapCourierFromDb(await this.userStore.getCourierByUserIdOrThrow(userId));
            if (!courier)
                throw new SpoonError_1.default('Courier not found');
            const { revision } = courier;
            if (!revision)
                throw new SpoonError_1.default('Courier revision not found');
            this.checkCanUpdateRevision(revision);
            if (revision.id !== revisionId)
                throw new SpoonError_1.default('userId');
            await this.documentStore.requestDocumentsRevisionVerification(revision.id, Document_1.DocumentsRevisionStatus.VerificationRequested);
            await this.notificationService.sendDocumentsVerificationRequested(courier);
        }
    };
    DocumentManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IDocumentStore_1.default,
            IUserStore_1.default,
            INotificationService_1.default])
    ], DocumentManager);
    return DocumentManager;
})();
exports.default = DocumentManager;
//# sourceMappingURL=DocumentManager.js.map