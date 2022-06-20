"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const Document_1 = require("../../../entities/Document");
const Common_1 = require("../../../entities/Common");
graphql_1.registerEnumType(Document_1.DocumentsRevisionStatus, { name: 'DocumentsRevisionStatus' });
let DocumentsRevision = (() => {
    let DocumentsRevision = class DocumentsRevision {
        constructor(id, comment, status) {
            this.id = id;
            this.comment = comment;
            this.status = status;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], DocumentsRevision.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], DocumentsRevision.prototype, "comment", void 0);
    __decorate([
        graphql_1.Field(() => Document_1.DocumentsRevisionStatus),
        __metadata("design:type", String)
    ], DocumentsRevision.prototype, "status", void 0);
    DocumentsRevision = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, String, String])
    ], DocumentsRevision);
    return DocumentsRevision;
})();
exports.default = DocumentsRevision;
//# sourceMappingURL=DocumentsRevision.js.map