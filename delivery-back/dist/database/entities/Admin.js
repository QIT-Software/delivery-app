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
const User_1 = __importDefault(require("./User"));
let Admin = (() => {
    let Admin = class Admin {
        constructor(id, user, userId, isEnabled) {
            this.id = id;
            this.user = user;
            this.userId = userId;
            this.isEnabled = isEnabled;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Admin.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(() => User_1.default, { nullable: false }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.default)
    ], Admin.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Admin.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Admin.prototype, "isEnabled", void 0);
    Admin = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique((c) => [c.user]),
        __metadata("design:paramtypes", [String, User_1.default, String, Boolean])
    ], Admin);
    return Admin;
})();
exports.default = Admin;
//# sourceMappingURL=Admin.js.map