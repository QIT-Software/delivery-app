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
const File_1 = __importDefault(require("./File"));
const Ingredient_1 = __importDefault(require("./Ingredient"));
let Dish = (() => {
    let Dish = class Dish {
        constructor(id, name, description, image, imageId, weight, kal, ingredients) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.image = image;
            this.imageId = imageId;
            this.weight = weight;
            this.kal = kal;
            this.ingredients = ingredients;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Dish.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Dish.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Dish.prototype, "description", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => File_1.default, { nullable: false }),
        __metadata("design:type", File_1.default)
    ], Dish.prototype, "image", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Dish.prototype, "imageId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Dish.prototype, "weight", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Dish.prototype, "kal", void 0);
    __decorate([
        typeorm_1.ManyToMany(() => Ingredient_1.default, { nullable: false }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Dish.prototype, "ingredients", void 0);
    Dish = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, File_1.default, String, String, String, Array])
    ], Dish);
    return Dish;
})();
exports.default = Dish;
//# sourceMappingURL=Dish.js.map