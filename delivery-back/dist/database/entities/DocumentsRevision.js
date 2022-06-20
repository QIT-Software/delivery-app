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
const Document_1 = require("../../entities/Document");
const Courier_1 = __importDefault(require("./Courier"));
let DocumentsRevision = (() => {
    let DocumentsRevision = class DocumentsRevision {
        constructor(id, status, comment, courier) {
            this.id = id;
            this.status = status;
            this.comment = comment;
            this.courier = courier;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], DocumentsRevision.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Document_1.DocumentsRevisionStatus }),
        __metadata("design:type", String)
    ], DocumentsRevision.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ default: '' }),
        __metadata("design:type", String)
    ], DocumentsRevision.prototype, "comment", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Courier_1.default, { nullable: false }),
        __metadata("design:type", Courier_1.default)
    ], DocumentsRevision.prototype, "courier", void 0);
    DocumentsRevision = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, Courier_1.default])
    ], DocumentsRevision);
    return DocumentsRevision;
})();
exports.default = DocumentsRevision;
//# sourceMappingURL=DocumentsRevision.js.map