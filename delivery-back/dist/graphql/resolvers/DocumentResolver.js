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
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const IDocumentManager_1 = __importDefault(require("../../managers/document/IDocumentManager"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const Document_1 = __importDefault(require("../entities/document/Document"));
const Mappers_1 = require("../entities/Mappers");
const HttpRequest_1 = __importDefault(require("../../enhancers/decorators/HttpRequest"));
const DocumentsRevision_1 = __importDefault(require("../entities/document/DocumentsRevision"));
const Document_2 = require("../../entities/Document");
graphql_1.registerEnumType(Document_2.EvaluateDocumentsRevisionType, { name: 'EvaluateDocumentsRevisionType' });
let DocumentResolver = (() => {
    let DocumentResolver = class DocumentResolver {
        constructor(documentManager) {
            this.documentManager = documentManager;
        }
        async getCurrentRevision({ userId }) {
            const revision = await this.documentManager.getCurrentRevision(userId);
            return revision ? Mappers_1.mapDocumentsRevisionToGQL(revision) : undefined;
        }
        async getDocuments(revisionId) {
            return Mappers_1.mapDocumentsToGQL(await this.documentManager.getDocuments(revisionId));
        }
        async addDocument({ userId }, { appType }, fileId, group) {
            return Mappers_1.mapDocumentToGQL(await this.documentManager.addDocument(userId, fileId, group, appType));
        }
        async deleteDocument({ userId }, { appType }, documentId) {
            await this.documentManager.deleteDocument(userId, documentId, appType);
            return true;
        }
        async requestDocumentsRevisionVerification({ userId }, revisionId) {
            await this.documentManager.requestRevisionVerification(userId, revisionId);
            return true;
        }
        async evaluateDocumentsRevision(courierId, type, comment) {
            await this.documentManager.evaluateRevision(courierId, type, comment);
            return true;
        }
    };
    __decorate([
        graphql_1.Query(() => DocumentsRevision_1.default, { nullable: true, name: 'currentRevision' }),
        Roles_1.default('Courier'),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DocumentResolver.prototype, "getCurrentRevision", null);
    __decorate([
        graphql_1.Query(() => [Document_1.default], { name: 'documents' }),
        Roles_1.default('Courier', 'Admin'),
        __param(0, graphql_1.Args({ name: 'revisionId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DocumentResolver.prototype, "getDocuments", null);
    __decorate([
        graphql_1.Mutation(() => Document_1.default),
        Roles_1.default('Courier'),
        __param(0, CurrentSession_1.default()),
        __param(1, HttpRequest_1.default()),
        __param(2, graphql_1.Args({ name: 'fileId', type: () => graphql_1.ID })),
        __param(3, graphql_1.Args({ name: 'group', type: () => Document_2.DocumentGroup })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, String, String]),
        __metadata("design:returntype", Promise)
    ], DocumentResolver.prototype, "addDocument", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Courier'),
        __param(0, CurrentSession_1.default()),
        __param(1, HttpRequest_1.default()),
        __param(2, graphql_1.Args({ name: 'documentId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, String]),
        __metadata("design:returntype", Promise)
    ], DocumentResolver.prototype, "deleteDocument", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Courier'),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args({ name: 'revisionId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], DocumentResolver.prototype, "requestDocumentsRevisionVerification", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'courierId', type: () => graphql_1.ID })),
        __param(1, graphql_1.Args({ name: 'type', type: () => Document_2.EvaluateDocumentsRevisionType })),
        __param(2, graphql_1.Args({ name: 'comment', type: () => String })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], DocumentResolver.prototype, "evaluateDocumentsRevision", null);
    DocumentResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IDocumentManager_1.default])
    ], DocumentResolver);
    return DocumentResolver;
})();
exports.default = DocumentResolver;
//# sourceMappingURL=DocumentResolver.js.map