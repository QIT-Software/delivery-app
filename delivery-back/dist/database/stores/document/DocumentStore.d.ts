import IDocumentStore from './IDocumentStore';
import { Repository } from 'typeorm';
import DocumentsRevision from '../../entities/DocumentsRevision';
import { DocumentGroup, DocumentsRevisionStatus } from 'entities/Document';
import { ID } from 'entities/Common';
import Document from 'database/entities/Document';
import Courier from 'database/entities/Courier';
export default class CourierStore implements IDocumentStore {
    private readonly repository;
    private readonly documentRevisionRepository;
    private readonly courierRepository;
    constructor(repository: Repository<Document>, documentRevisionRepository: Repository<DocumentsRevision>, courierRepository: Repository<Courier>);
    getDocuments(revisionId: string): Promise<Document[]>;
    addDocument(revisionId: ID, file: {
        id: ID;
    }, group: DocumentGroup): Promise<Document>;
    deleteDocument(id: string): Promise<void>;
    findDocumentById(id: string): Promise<Document | undefined>;
    requestDocumentsRevisionVerification(revisionId: ID, status: DocumentsRevisionStatus.VerificationRequested): Promise<void>;
    evaluateRevision(revisionId: ID, status: DocumentsRevisionStatus.Approved | DocumentsRevisionStatus.ChangesRequested | DocumentsRevisionStatus.Rejected, comment: string): Promise<void>;
    createDocumentsRevisionIfNotExists(courierId: ID): Promise<void>;
}
