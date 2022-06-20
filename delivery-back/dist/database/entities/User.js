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
const Preferences_1 = __importDefault(require("./Preferences"));
const File_1 = __importDefault(require("./File"));
let User = (() => {
    let User = class User {
        constructor(id, image, imageId, name, email, phoneNumber, preferences, preferencesId, lat, lng) {
            this.id = id;
            this.image = image;
            this.imageId = imageId;
            this.name = name;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.preferences = preferences;
            this.preferencesId = preferencesId;
            this.lat = lat;
            this.lng = lng;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => File_1.default, { nullable: true }),
        __metadata("design:type", File_1.default)
    ], User.prototype, "image", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "imageId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.OneToOne(() => Preferences_1.default, { nullable: false }),
        __metadata("design:type", Preferences_1.default)
    ], User.prototype, "preferences", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "preferencesId", void 0);
    __decorate([
        typeorm_1.Column('float', { nullable: true }),
        __metadata("design:type", Number)
    ], User.prototype, "lat", void 0);
    __decorate([
        typeorm_1.Column('float', { nullable: true }),
        __metadata("design:type", Number)
    ], User.prototype, "lng", void 0);
    User = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, File_1.default, String, String, String, String, Preferences_1.default, String, Number, Number])
    ], User);
    return User;
})();
exports.default = User;
//# sourceMappingURL=User.js.map