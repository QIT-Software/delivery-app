import File from 'database/entities/File';
import { DocumentGroup } from 'entities/Document';
import DocumentsRevision from './DocumentsRevision';
export default class Document {
    constructor(id: string, group: DocumentGroup, file: File, fileId: string, revision: DocumentsRevision);
    id: string;
    group: DocumentGroup;
    file?: File;
    fileId: string;
    revision?: DocumentsRevision;
}
