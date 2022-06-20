import { ID } from 'entities/Common';
import User from 'graphql/entities/user/User';
import DocumentsRevision from 'graphql/entities/document/DocumentsRevision';
export default class Courier {
    constructor(id: string, user: User, revision: DocumentsRevision | undefined);
    id: ID;
    user: User;
    revision?: DocumentsRevision | undefined;
}
