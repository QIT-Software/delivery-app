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
exports.AccountResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const IAccountManager_1 = __importDefault(require("../../managers/account/IAccountManager"));
const Account_1 = __importDefault(require("../entities/account/Account"));
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Mappers_1 = require("../entities/Mappers");
const UserUpdateRequest_1 = __importDefault(require("../entities/user/UserUpdateRequest"));
let AccountResolver = (() => {
    let AccountResolver = class AccountResolver {
        constructor(accountManager) {
            this.accountManager = accountManager;
        }
        async myAccount({ userId }) {
            return Mappers_1.mapAccountToGQL(await this.accountManager.getMyAccount(userId));
        }
        async updateMyAccount({ userId }, userInput) {
            return Mappers_1.mapAccountToGQL(await this.accountManager.updateAccount(userId, {
                name: userInput.name,
                email: userInput.email,
                phoneNumber: userInput.phoneNumber,
            }));
        }
        async updateMyAccountImage({ userId }, image) {
            await this.accountManager.updateAccountImage(userId, image);
            return true;
        }
    };
    __decorate([
        graphql_1.Query(() => Account_1.default),
        __param(0, CurrentSession_1.default()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AccountResolver.prototype, "myAccount", null);
    __decorate([
        graphql_1.Mutation(() => Account_1.default),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('user', new common_1.ValidationPipe())),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, UserUpdateRequest_1.default]),
        __metadata("design:returntype", Promise)
    ], AccountResolver.prototype, "updateMyAccount", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        __param(0, CurrentSession_1.default()),
        __param(1, graphql_1.Args('image')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], AccountResolver.prototype, "updateMyAccountImage", null);
    AccountResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IAccountManager_1.default])
    ], AccountResolver);
    return AccountResolver;
})();
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=AccountResolver.js.map