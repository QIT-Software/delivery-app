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
const Set_1 = __importDefault(require("../set/Set"));
let SelectedSetInfo = (() => {
    let SelectedSetInfo = class SelectedSetInfo {
        constructor(set, quantity, numberOfDays) {
            this.set = set;
            this.quantity = quantity;
            this.numberOfDays = numberOfDays;
        }
    };
    __decorate([
        graphql_1.Field(() => Set_1.default),
        __metadata("design:type", Set_1.default)
    ], SelectedSetInfo.prototype, "set", void 0);
    __decorate([
        graphql_1.Field(() => Number),
        __metadata("design:type", Number)
    ], SelectedSetInfo.prototype, "quantity", void 0);
    __decorate([
        graphql_1.Field(() => Number),
        __metadata("design:type", Number)
    ], SelectedSetInfo.prototype, "numberOfDays", void 0);
    SelectedSetInfo = __decorate([
        graphql_1.InputType(),
        __metadata("design:paramtypes", [Set_1.default, Number, Number])
    ], SelectedSetInfo);
    return SelectedSetInfo;
})();
exports.default = SelectedSetInfo;
//# sourceMappingURL=SelectedSetInfo.js.map