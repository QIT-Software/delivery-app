import { ID } from 'entities/Common';
export declare enum DocumentGroup {
    EmploymentAgreement = "employmentAgreement",
    DriversLicense = "driversLicense"
}
export interface Document {
    id: ID;
    group: DocumentGroup;
    fileId: ID;
}
export declare enum EvaluateDocumentsRevisionType {
    Approve = "Approve",
    RequestChanges = "RequestChanges",
    Reject = "Reject"
}
export declare enum DocumentsRevisionStatus {
    New = "New",
    VerificationRequested = "VerificationRequested",
    ChangesRequested = "ChangesRequested",
    Approved = "Approved",
    Rejected = "Rejected"
}
export interface DocumentsRevision {
    id: ID;
    comment: string;
    status: DocumentsRevisionStatus;
}
