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
let LatLngInput = (() => {
    let LatLngInput = class LatLngInput {
        constructor(lat, lng) {
            this.lat = lat;
            this.lng = lng;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", Number)
    ], LatLngInput.prototype, "lat", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", Number)
    ], LatLngInput.prototype, "lng", void 0);
    LatLngInput = __decorate([
        graphql_1.InputType(),
        __metadata("design:paramtypes", [Number, Number])
    ], LatLngInput);
    return LatLngInput;
})();
exports.default = LatLngInput;
//# sourceMappingURL=LatLngInput.js.map