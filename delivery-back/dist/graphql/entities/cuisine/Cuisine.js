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
let Cuisine = (() => {
    let Cuisine = class Cuisine {
        constructor(id, imageId, nationality, rating) {
            this.id = id;
            this.imageId = imageId;
            this.nationality = nationality;
            this.rating = rating;
        }
    };
    __decorate([
        graphql_1.Field(() => graphql_1.ID),
        __metadata("design:type", String)
    ], Cuisine.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Cuisine.prototype, "imageId", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Cuisine.prototype, "nationality", void 0);
    __decorate([
        graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", Object)
    ], Cuisine.prototype, "rating", void 0);
    Cuisine = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, String, String, Object])
    ], Cuisine);
    return Cuisine;
})();
exports.default = Cuisine;
//# sourceMappingURL=Cuisine.js.map