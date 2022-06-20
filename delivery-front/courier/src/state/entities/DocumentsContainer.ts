import {DocumentsGroups, DocumentsRevision} from 'entities/Documents';

export interface DocumentsContainer {
  revision: DocumentsRevision | undefined;
  groups: DocumentsGroups;
}
