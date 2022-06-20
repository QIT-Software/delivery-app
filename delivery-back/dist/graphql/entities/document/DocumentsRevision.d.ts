import { DocumentsRevisionStatus } from 'entities/Document';
import { ID } from 'entities/Common';
export default class DocumentsRevision {
    id: ID;
    comment: string;
    constructor(id: string, comment: string, status: DocumentsRevisionStatus);
    status: DocumentsRevisionStatus;
}
