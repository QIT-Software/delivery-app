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
const Common_1 = require("../../../entities/Common");
const User_1 = __importDefault(require("./User"));
let Client = (() => {
    let Client = class Client {
        constructor(id, user) {
            this.id = id;
            this.user = user;
        }
    };
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", String)
    ], Client.prototype, "id", void 0);
    __decorate([
        graphql_1.Field(),
        __metadata("design:type", User_1.default)
    ], Client.prototype, "user", void 0);
    Client = __decorate([
        graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String, User_1.default])
    ], Client);
    return Client;
})();
exports.default = Client;
//# sourceMappingURL=Client.js.map