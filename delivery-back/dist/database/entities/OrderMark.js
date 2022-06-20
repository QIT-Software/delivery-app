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
let OrderMark = (() => {
    let OrderMark = class OrderMark {
        constructor(id, date, lat, lng) {
            this.id = id;
            this.date = date;
            this.lat = lat;
            this.lng = lng;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], OrderMark.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], OrderMark.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column('decimal', { nullable: true }),
        __metadata("design:type", Number)
    ], OrderMark.prototype, "lat", void 0);
    __decorate([
        typeorm_1.Column('decimal', { nullable: true }),
        __metadata("design:type", Number)
    ], OrderMark.prototype, "lng", void 0);
    OrderMark = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, Date, Number, Number])
    ], OrderMark);
    return OrderMark;
})();
exports.default = OrderMark;
//# sourceMappingURL=OrderMark.js.map