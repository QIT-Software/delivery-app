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
const AdditionalUserInfo_1 = __importDefault(require("./AdditionalUserInfo"));
let User = (() => {
    let User = class User {
        constructor(id, image, name, preferencesId, lat, lng, additionalUserInfo) {
            this.id = id;
            this.image = image;
            this.name = name;
            this.preferencesId = preferencesId;
            this.lat = lat;
            this.lng = lng;
            this.additionalUserInfo = additionalUserInfo;
        }
    };
    __decorate([
        graphql_1.Field(() => graphql_1.ID),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "image", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], User.prototype, "preferencesId", void 0);
    __decorate([
        graphql_1.Field(() => Number),
        __metadata("design:type", Number)
    ], User.prototype, "lat", void 0);
    __decorate([
        graphql_1.Field(() => Number),
        __metadata("design:type", Number)
    ], User.prototype, "lng", void 0);
    __decorate([
        graphql_1.Field(() => AdditionalUserInfo_1.default, { nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "additionalUserInfo", void 0);
    User = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, String, String, String, Number, Number, AdditionalUserInfo_1.default])
    ], User);
    return User;
})();
exports.default = User;
//# sourceMappingURL=User.js.map