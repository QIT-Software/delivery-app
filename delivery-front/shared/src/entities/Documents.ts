import {ID} from 'entities/Common';

export interface DocumentsRevision {
  id: string;
  status: DocumentsRevisionStatus;
  comment: string;
}

export interface Document {
  id: ID;
  image: string;
}

export enum DocumentsRevisionStatus {
  New = 'New',
  VerificationRequested = 'VerificationRequested',
  ChangesRequested = 'ChangesRequested',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface DocumentsGroups {
  employmentAgreement: Document[];
  driversLicense: Document[];
}

export type DocumentsGroup = keyof DocumentsGroups;
