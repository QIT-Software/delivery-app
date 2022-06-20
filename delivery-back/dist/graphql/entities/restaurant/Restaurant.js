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
const Address_1 = __importDefault(require("../address/Address"));
const Cuisine_1 = __importDefault(require("../cuisine/Cuisine"));
const User_1 = __importDefault(require("../user/User"));
let Restaurant = (() => {
    let Restaurant = class Restaurant {
        constructor(id, user, imageId, address, title, description, cuisines) {
            this.id = id;
            this.user = user;
            this.imageId = imageId;
            this.address = address;
            this.title = title;
            this.description = description;
            this.cuisines = cuisines;
        }
    };
    __decorate([
        graphql_1.Field(() => graphql_1.ID),
        __metadata("design:type", String)
    ], Restaurant.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(() => User_1.default),
        __metadata("design:type", User_1.default)
    ], Restaurant.prototype, "user", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Restaurant.prototype, "imageId", void 0);
    __decorate([
        graphql_1.Field(() => Address_1.default),
        __metadata("design:type", Address_1.default)
    ], Restaurant.prototype, "address", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Restaurant.prototype, "title", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Restaurant.prototype, "description", void 0);
    __decorate([
        graphql_1.Field(() => [Cuisine_1.default]),
        __metadata("design:type", Array)
    ], Restaurant.prototype, "cuisines", void 0);
    Restaurant = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, User_1.default, String, Address_1.default, String, String, Array])
    ], Restaurant);
    return Restaurant;
})();
exports.default = Restaurant;
//# sourceMappingURL=Restaurant.js.map