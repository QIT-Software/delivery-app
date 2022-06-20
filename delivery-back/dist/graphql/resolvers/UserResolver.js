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
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const Client_1 = __importDefault(require("../entities/user/Client"));
const Courier_1 = __importDefault(require("../entities/user/Courier"));
const Roles_1 = __importDefault(require("../../enhancers/decorators/Roles"));
const IUserManager_1 = __importDefault(require("../../managers/user/IUserManager"));
const Mappers_1 = require("../entities/Mappers");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
let UserResolver = (() => {
    let UserResolver = class UserResolver {
        constructor(userManager) {
            this.userManager = userManager;
        }
        async updateClientInformation(id, name, email, phoneNumber) {
            await this.userManager.updateClientInformation(id, name, email, phoneNumber);
            return true;
        }
        async updateCourierInformation(id, name, email, phoneNumber) {
            await this.userManager.updateCourierInformation(id, name, email, phoneNumber);
            return true;
        }
        async getCouriers() {
            return Mappers_1.mapCouriersToGQL(await this.userManager.getCouriers());
        }
        async getCourierById(courierId) {
            const courier = await this.userManager.getCourierById(courierId);
            if (!courier)
                throw new SpoonError_1.default('Courier not found');
            return Mappers_1.mapCourierToGQL(courier);
        }
        async getClients() {
            return Mappers_1.mapClientsToGQL(await this.userManager.getClients());
        }
        async getClientById(clientId) {
            const client = await this.userManager.getClientById(clientId);
            if (!client)
                throw new SpoonError_1.default('Client not found');
            return Mappers_1.mapClientToGQL(client);
        }
    };
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'id', type: () => graphql_1.ID })),
        __param(1, graphql_1.Args('name')),
        __param(2, graphql_1.Args('email')),
        __param(3, graphql_1.Args('phoneNumber')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "updateClientInformation", null);
    __decorate([
        graphql_1.Mutation(() => Boolean),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'id', type: () => graphql_1.ID })),
        __param(1, graphql_1.Args('name')),
        __param(2, graphql_1.Args('email')),
        __param(3, graphql_1.Args('phoneNumber')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "updateCourierInformation", null);
    __decorate([
        graphql_1.Query(() => [Courier_1.default], { name: 'couriers' }),
        Roles_1.default('Admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "getCouriers", null);
    __decorate([
        graphql_1.Query(() => Courier_1.default, { name: 'courierById' }),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'courierId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "getCourierById", null);
    __decorate([
        graphql_1.Query(() => [Client_1.default], { name: 'clients' }),
        Roles_1.default('Admin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "getClients", null);
    __decorate([
        graphql_1.Query(() => Client_1.default, { name: 'clientById' }),
        Roles_1.default('Admin'),
        __param(0, graphql_1.Args({ name: 'clientId', type: () => graphql_1.ID })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "getClientById", null);
    UserResolver = __decorate([
        graphql_1.Resolver(),
        common_1.UseGuards(AuthGuard_1.default),
        __metadata("design:paramtypes", [IUserManager_1.default])
    ], UserResolver);
    return UserResolver;
})();
exports.default = UserResolver;
//# sourceMappingURL=UserResolver.js.map