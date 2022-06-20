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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = __importDefault(require("../../entities/File"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FileStore = (() => {
    let FileStore = class FileStore {
        constructor(connection, fileStore) {
            this.connection = connection;
            this.fileStore = fileStore;
        }
        async addFile(name, mimeType, mediaLink) {
            const file = await this.fileStore.create({ name, mimeType, mediaLink });
            await this.fileStore.insert(file);
            return file;
        }
        async getFile(file) {
            return this.fileStore.findOne({ where: { id: file.id } });
        }
    };
    FileStore = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectConnection()),
        __param(1, typeorm_1.InjectRepository(File_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Connection,
            typeorm_2.Repository])
    ], FileStore);
    return FileStore;
})();
exports.default = FileStore;
//# sourceMappingURL=FileStore.js.map