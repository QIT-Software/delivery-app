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
const AppType_1 = __importDefault(require("../../entities/AppType"));
const Platform_1 = require("../../entities/Platform");
let Session = (() => {
    let Session = class Session {
        constructor(id, token, refreshToken, user, userId, appType, platform, firebaseRegistrationId) {
            this.id = id;
            this.token = token;
            this.refreshToken = refreshToken;
            this.user = user;
            this.userId = userId;
            this.appType = appType;
            this.platform = platform;
            this.firebaseRegistrationId = firebaseRegistrationId;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Session.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Session.prototype, "token", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Session.prototype, "refreshToken", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => User_1.default, { nullable: false }),
        __metadata("design:type", User_1.default)
    ], Session.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Session.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: AppType_1.default }),
        __metadata("design:type", String)
    ], Session.prototype, "appType", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Platform_1.Platform }),
        __metadata("design:type", String)
    ], Session.prototype, "platform", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Session.prototype, "firebaseRegistrationId", void 0);
    Session = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, User_1.default, String, String, String, String])
    ], Session);
    return Session;
})();
exports.default = Session;
//# sourceMappingURL=Session.js.map