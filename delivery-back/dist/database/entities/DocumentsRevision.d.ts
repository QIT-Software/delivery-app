import { DocumentsRevisionStatus } from 'entities/Document';
import Courier from 'database/entities/Courier';
export default class DocumentsRevision {
    id: string;
    status: DocumentsRevisionStatus;
    comment: string;
    courier: Courier;
    constructor(id: string, status: DocumentsRevisionStatus, comment: string, courier: Courier);
}
