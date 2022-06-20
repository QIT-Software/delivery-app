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
const typeorm_1 = require("typeorm");
let Address = (() => {
    let Address = class Address {
        constructor(id, placeId, description, entrance, floor, apartment, date, lat, lng) {
            this.id = id;
            this.placeId = placeId;
            this.description = description;
            this.entrance = entrance;
            this.floor = floor;
            this.apartment = apartment;
            this.date = date;
            this.lat = lat;
            this.lng = lng;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Address.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Address.prototype, "placeId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Address.prototype, "entrance", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Address.prototype, "floor", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Address.prototype, "apartment", void 0);
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], Address.prototype, "lat", void 0);
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], Address.prototype, "lng", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], Address.prototype, "date", void 0);
    Address = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, String, String, String, Date, Number, Number])
    ], Address);
    return Address;
})();
exports.default = Address;
//# sourceMappingURL=Address.js.map