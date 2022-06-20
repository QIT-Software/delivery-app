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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const File_1 = __importDefault(require("./File"));
const Document_1 = require("../../entities/Document");
const DocumentsRevision_1 = __importDefault(require("./DocumentsRevision"));
let Document = (() => {
    let Document = class Document {
        constructor(id, group, file, fileId, revision) {
            this.id = id;
            this.group = group;
            this.file = file;
            this.fileId = fileId;
            this.revision = revision;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Document.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Document_1.DocumentGroup }),
        __metadata("design:type", String)
    ], Document.prototype, "group", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => File_1.default, { nullable: false }),
        __metadata("design:type", File_1.default)
    ], Document.prototype, "file", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Document.prototype, "fileId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => DocumentsRevision_1.default),
        __metadata("design:type", DocumentsRevision_1.default)
    ], Document.prototype, "revision", void 0);
    Document = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, File_1.default, String, DocumentsRevision_1.default])
    ], Document);
    return Document;
})();
exports.default = Document;
//# sourceMappingURL=Document.js.map