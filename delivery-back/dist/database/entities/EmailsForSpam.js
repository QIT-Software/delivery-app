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
let EmailsForSpam = (() => {
    let EmailsForSpam = class EmailsForSpam {
        constructor(id, email, isDiscount) {
            this.id = id;
            this.email = email;
            this.isDiscount = isDiscount;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], EmailsForSpam.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], EmailsForSpam.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], EmailsForSpam.prototype, "isDiscount", void 0);
    EmailsForSpam = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, Boolean])
    ], EmailsForSpam);
    return EmailsForSpam;
})();
exports.default = EmailsForSpam;
//# sourceMappingURL=EmailsForSpam.js.map