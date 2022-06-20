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
let CreateAddressRequest = (() => {
    let CreateAddressRequest = class CreateAddressRequest {
        constructor(placeId, description, entrance, floor, apartment, date, lat, lng) {
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
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Object)
    ], CreateAddressRequest.prototype, "placeId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CreateAddressRequest.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CreateAddressRequest.prototype, "entrance", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CreateAddressRequest.prototype, "floor", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CreateAddressRequest.prototype, "apartment", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], CreateAddressRequest.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], CreateAddressRequest.prototype, "lat", void 0);
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], CreateAddressRequest.prototype, "lng", void 0);
    CreateAddressRequest = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object, String, String, String, String, Date, Number, Number])
    ], CreateAddressRequest);
    return CreateAddressRequest;
})();
exports.default = CreateAddressRequest;
//# sourceMappingURL=CreateAddressRequest.js.map