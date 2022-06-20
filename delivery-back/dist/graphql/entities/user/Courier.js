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
const graphql_1 = require("@nestjs/graphql");
const Common_1 = require("../../../entities/Common");
const User_1 = __importDefault(require("./User"));
const DocumentsRevision_1 = __importDefault(require("../document/DocumentsRevision"));
const Document_1 = require("../../../entities/Document");
graphql_1.registerEnumType(Document_1.DocumentsRevisionStatus, { name: 'DocumentsRevisionStatus' });
let Courier = (() => {
    let Courier = class Courier {
        constructor(id, user, revision) {
            this.id = id;
            this.user = user;
            this.revision = revision;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], Courier.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", User_1.default)
    ], Courier.prototype, "user", void 0);
    __decorate([
        graphql_1.Field(() => DocumentsRevision_1.default, { nullable: true }),
        __metadata("design:type", Object)
    ], Courier.prototype, "revision", void 0);
    Courier = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, User_1.default, Object])
    ], Courier);
    return Courier;
})();
exports.default = Courier;
//# sourceMappingURL=Courier.js.map