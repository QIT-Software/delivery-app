import IDocumentManager from 'managers/document/IDocumentManager';
import Session from '../../entities/Session';
import Document from 'graphql/entities/document/Document';
import { HttpRequestInfo } from '../../enhancers/decorators/HttpRequest';
import DocumentsRevision from 'graphql/entities/document/DocumentsRevision';
import { EvaluateDocumentsRevisionType, DocumentGroup } from 'entities/Document';
export default class DocumentResolver {
    private readonly documentManager;
    constructor(documentManager: IDocumentManager);
    getCurrentRevision({ userId }: Session): Promise<DocumentsRevision | undefined>;
    getDocuments(revisionId: string): Promise<Document[]>;
    addDocument({ userId }: Session, { appType }: HttpRequestInfo, fileId: string, group: DocumentGroup): Promise<Document>;
    deleteDocument({ userId }: Session, { appType }: HttpRequestInfo, documentId: string): Promise<boolean>;
    requestDocumentsRevisionVerification({ userId }: Session, revisionId: string): Promise<boolean>;
    evaluateDocumentsRevision(courierId: string, type: EvaluateDocumentsRevisionType, comment: string): Promise<boolean>;
}
