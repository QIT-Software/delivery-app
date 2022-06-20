import IDocumentManager from 'managers/document/IDocumentManager';
import IDocumentStore from 'database/stores/document/IDocumentStore';
import { DocumentGroup, DocumentsRevision, EvaluateDocumentsRevisionType } from 'entities/Document';
import { ID } from 'entities/Common';
import IUserStore from 'database/stores/user/IUserStore';
import INotificationService from 'services/notification/INotificationService';
export default class DocumentManager implements IDocumentManager {
    private readonly documentStore;
    private readonly userStore;
    private readonly notificationService;
    constructor(documentStore: IDocumentStore, userStore: IUserStore, notificationService: INotificationService);
    getCurrentRevision(userId: ID): Promise<DocumentsRevision | undefined>;
    getDocuments(revisionId: ID): Promise<import("../../entities/Document").Document[]>;
    addDocument(userId: ID, fileId: ID, group: DocumentGroup): Promise<import("../../entities/Document").Document>;
    private checkCanUpdateRevision;
    deleteDocument(userId: ID, documentId: ID): Promise<void>;
    evaluateRevision(courierId: ID, type: EvaluateDocumentsRevisionType, comment: string): Promise<void>;
    requestRevisionVerification(userId: ID, revisionId: ID): Promise<void>;
}
