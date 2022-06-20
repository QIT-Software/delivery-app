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
const Ingredient_1 = __importDefault(require("../ingredient/Ingredient"));
let Dish = (() => {
    let Dish = class Dish {
        constructor(id, name, description, imageId, weight, kal, ingredients) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.imageId = imageId;
            this.weight = weight;
            this.kal = kal;
            this.ingredients = ingredients;
        }
    };
    __decorate([
        graphql_1.Field(() => graphql_1.ID),
        __metadata("design:type", String)
    ], Dish.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Dish.prototype, "name", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Dish.prototype, "description", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Dish.prototype, "imageId", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Dish.prototype, "weight", void 0);
    __decorate([
        graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], Dish.prototype, "kal", void 0);
    __decorate([
        graphql_1.Field(() => [Ingredient_1.default]),
        __metadata("design:type", Array)
    ], Dish.prototype, "ingredients", void 0);
    Dish = __decorate([
        graphql_1.InputType('DishInput'),
        graphql_1.ObjectType('Dish'),
        __metadata("design:paramtypes", [String, String, String, String, String, String, Array])
    ], Dish);
    return Dish;
})();
exports.default = Dish;
//# sourceMappingURL=Dish.js.map