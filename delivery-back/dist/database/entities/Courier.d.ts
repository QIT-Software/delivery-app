import User from './User';
import DocumentsRevision from 'database/entities/DocumentsRevision';
export default class Courier {
    constructor(id: string, user: User, userId: string);
    id: string;
    user?: User;
    userId: string;
    revision?: DocumentsRevision;
    revisionId: string | undefined;
}
