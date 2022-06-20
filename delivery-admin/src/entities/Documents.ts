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
  w4: Document[];
  carInsurance: Document[];
  driversLicense: Document[];
  licensePlate: Document[];
  carRegistration: Document[];
}

export type DocumentsGroup = keyof DocumentsGroups;

export enum EvaluateDocumentsRevisionType {
  Approve = 'Approve',
  RequestChanges = 'RequestChanges',
  Reject = 'Reject',
}
