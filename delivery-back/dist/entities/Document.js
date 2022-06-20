"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsRevisionStatus = exports.EvaluateDocumentsRevisionType = exports.DocumentGroup = void 0;
const Common_1 = require("./Common");
var DocumentGroup;
(function (DocumentGroup) {
    DocumentGroup["EmploymentAgreement"] = "employmentAgreement";
    DocumentGroup["DriversLicense"] = "driversLicense";
})(DocumentGroup = exports.DocumentGroup || (exports.DocumentGroup = {}));
var EvaluateDocumentsRevisionType;
(function (EvaluateDocumentsRevisionType) {
    EvaluateDocumentsRevisionType["Approve"] = "Approve";
    EvaluateDocumentsRevisionType["RequestChanges"] = "RequestChanges";
    EvaluateDocumentsRevisionType["Reject"] = "Reject";
})(EvaluateDocumentsRevisionType = exports.EvaluateDocumentsRevisionType || (exports.EvaluateDocumentsRevisionType = {}));
var DocumentsRevisionStatus;
(function (DocumentsRevisionStatus) {
    DocumentsRevisionStatus["New"] = "New";
    DocumentsRevisionStatus["VerificationRequested"] = "VerificationRequested";
    DocumentsRevisionStatus["ChangesRequested"] = "ChangesRequested";
    DocumentsRevisionStatus["Approved"] = "Approved";
    DocumentsRevisionStatus["Rejected"] = "Rejected";
})(DocumentsRevisionStatus = exports.DocumentsRevisionStatus || (exports.DocumentsRevisionStatus = {}));
//# sourceMappingURL=Document.js.map