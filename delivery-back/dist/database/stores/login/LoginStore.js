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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ILoginStore_1 = __importDefault(require("./ILoginStore"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const LocalLogin_1 = __importDefault(require("../../entities/LocalLogin"));
const Common_1 = require("../../../entities/Common");
let LoginStore = (() => {
    let LoginStore = class LoginStore extends ILoginStore_1.default {
        constructor(repository) {
            super();
            this.repository = repository;
        }
        async createLocalLogin(user, email, passwordHash) {
            const login = this.repository.create({
                user,
                email,
                passwordHash,
            });
            await this.repository.insert(login);
            return login;
        }
        async getLocalLoginByEmail(email) {
            return this.repository
                .createQueryBuilder('ll')
                .where('LOWER(ll.email) = LOWER(:email)', { email })
                .innerJoinAndSelect('ll.user', 'u')
                .getOne();
        }
        getLocalLoginByUser(user) {
            return this.repository.findOne({ user: { id: user.id } }, { relations: ['user'] });
        }
        async updateLocalLoginPassword(user, passwordHash) {
            await this.repository.update(user.id, {
                passwordHash,
            });
        }
        findLocalLoginByEmail(email) {
            return this.repository.findOne({ where: { email } });
        }
    };
    LoginStore = __decorate([
        __param(0, typeorm_1.InjectRepository(LocalLogin_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], LoginStore);
    return LoginStore;
})();
exports.default = LoginStore;
//# sourceMappingURL=LoginStore.js.map