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
const Dish_1 = __importDefault(require("../dish/Dish"));
const Status_1 = __importDefault(require("../status/Status"));
let Set = (() => {
    let Set = class Set {
        constructor(id, name, imageId, cuisineId, priceCents, dishes, statuses, day, isFavorite) {
            this.id = id;
            this.name = name;
            this.imageId = imageId;
            this.cuisineId = cuisineId;
            this.priceCents = priceCents;
            this.dishes = dishes;
            this.statuses = statuses;
            this.day = day;
            this.isFavorite = isFavorite;
        }
    };
    __decorate([
        graphql_1.Field(() => graphql_1.ID),
        __metadata("design:type", String)
    ], Set.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Set.prototype, "name", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Set.prototype, "imageId", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Set.prototype, "cuisineId", void 0);
    __decorate([
        graphql_1.Field(() => graphql_1.Int),
        __metadata("design:type", Number)
    ], Set.prototype, "priceCents", void 0);
    __decorate([
        graphql_1.Field(() => [Dish_1.default]),
        __metadata("design:type", Array)
    ], Set.prototype, "dishes", void 0);
    __decorate([
        graphql_1.Field(() => [Status_1.default]),
        __metadata("design:type", Array)
    ], Set.prototype, "statuses", void 0);
    __decorate([
        graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", Object)
    ], Set.prototype, "day", void 0);
    __decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        __metadata("design:type", Object)
    ], Set.prototype, "isFavorite", void 0);
    Set = __decorate([
        graphql_1.InputType('SetInput'),
        graphql_1.ObjectType('Set'),
        __metadata("design:paramtypes", [String, String, String, String, Number, Array, Array, Object, Object])
    ], Set);
    return Set;
})();
exports.default = Set;
//# sourceMappingURL=Set.js.map