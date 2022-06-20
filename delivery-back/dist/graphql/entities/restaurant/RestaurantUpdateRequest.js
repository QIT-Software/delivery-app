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
const class_validator_1 = require("class-validator");
let RestaurantUpdateRequest = (() => {
    let RestaurantUpdateRequest = class RestaurantUpdateRequest {
        constructor(userId, imageId, address, description, title) {
            this.userId = userId;
            this.imageId = imageId;
            this.address = address;
            this.title = title;
            this.description = description;
        }
    };
    __decorate([
        graphql_1.Field(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], RestaurantUpdateRequest.prototype, "userId", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], RestaurantUpdateRequest.prototype, "imageId", void 0);
    __decorate([
        graphql_1.Field(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], RestaurantUpdateRequest.prototype, "address", void 0);
    __decorate([
        graphql_1.Field(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], RestaurantUpdateRequest.prototype, "title", void 0);
    __decorate([
        graphql_1.Field(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], RestaurantUpdateRequest.prototype, "description", void 0);
    RestaurantUpdateRequest = __decorate([
        graphql_1.InputType(),
        __metadata("design:paramtypes", [String, String, String, String, String])
    ], RestaurantUpdateRequest);
    return RestaurantUpdateRequest;
})();
exports.default = RestaurantUpdateRequest;
//# sourceMappingURL=RestaurantUpdateRequest.js.map