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
const Cuisine_1 = __importDefault(require("./Cuisine"));
const Dish_1 = __importDefault(require("./Dish"));
const Status_1 = __importDefault(require("./Status"));
let Set = (() => {
    let Set = class Set {
        constructor(id, name, image, imageId, cuisine, cuisineId, priceCents, dishes, status, day, isFavorite) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.imageId = imageId;
            this.cuisine = cuisine;
            this.cuisineId = cuisineId;
            this.priceCents = priceCents;
            this.dishes = dishes;
            this.statuses = status;
            this.day = day;
            this.isFavorite = isFavorite;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Set.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Set.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => File_1.default, { nullable: false }),
        __metadata("design:type", File_1.default)
    ], Set.prototype, "image", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Set.prototype, "imageId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Cuisine_1.default, { nullable: false }),
        __metadata("design:type", Cuisine_1.default)
    ], Set.prototype, "cuisine", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Set.prototype, "cuisineId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Set.prototype, "priceCents", void 0);
    __decorate([
        typeorm_1.ManyToMany(() => Dish_1.default, { nullable: false }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Set.prototype, "dishes", void 0);
    __decorate([
        typeorm_1.ManyToMany(() => Status_1.default, { nullable: false }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Set.prototype, "statuses", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Set.prototype, "day", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Boolean)
    ], Set.prototype, "isFavorite", void 0);
    Set = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, File_1.default, String, Cuisine_1.default, String, Number, Array, Array, String, Boolean])
    ], Set);
    return Set;
})();
exports.default = Set;
//# sourceMappingURL=Set.js.map