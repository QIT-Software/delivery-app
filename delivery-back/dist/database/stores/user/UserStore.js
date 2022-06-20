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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = __importDefault(require("../../entities/User"));
const Common_1 = require("../../../entities/Common");
const SpoonError_1 = __importDefault(require("../../../SpoonError"));
const Client_1 = __importDefault(require("../../entities/Client"));
const Admin_1 = __importDefault(require("../../entities/Admin"));
const Courier_1 = __importDefault(require("../../entities/Courier"));
const Order_1 = __importDefault(require("../../entities/Order"));
const Address_1 = __importDefault(require("../../entities/Address"));
const Order_2 = require("../../../entities/Order");
let UserStore = (() => {
    let UserStore = class UserStore {
        constructor(connection, repository, clientRepository, courierRepository, orderRepository, addressRepository, adminRepository) {
            this.connection = connection;
            this.repository = repository;
            this.clientRepository = clientRepository;
            this.courierRepository = courierRepository;
            this.orderRepository = orderRepository;
            this.addressRepository = addressRepository;
            this.adminRepository = adminRepository;
        }
        async getUser(userId) {
            return this.repository.findOneOrFail({
                where: { id: userId },
            });
        }
        async getUserOrFail(userId) {
            const user = await this.getUser(userId);
            if (!user)
                throw new SpoonError_1.default('User not found');
            return user;
        }
        async createUser(user) {
            const newUser = this.repository.create(Object.assign({}, user));
            await this.repository.insert(newUser);
            return newUser;
        }
        async createClientIfNotExists(userId) {
            const user = { id: userId };
            const client = await this.clientRepository.findOne({ user }, {
                loadRelationIds: true,
            });
            if (client)
                return client;
            {
                const client = this.clientRepository.create({ user });
                await this.clientRepository.insert(client);
                return client;
            }
        }
        async createCourierIfNotExists(userId) {
            const user = { id: userId };
            const courier = await this.courierRepository.findOne({ user }, {
                loadRelationIds: true,
            });
            if (courier)
                return courier;
            {
                const courier = this.courierRepository.create({ user });
                await this.courierRepository.insert(courier);
                return courier;
            }
        }
        async getClientOrThrow(userId) {
            return this.clientRepository.findOneOrFail({ user: { id: userId } });
        }
        async getCourierByUserIdOrThrow(userId) {
            return this.courierRepository.findOneOrFail({ user: { id: userId } }, { relations: ['user', 'revision'] });
        }
        async getClientById(id) {
            return this.clientRepository.findOneOrFail({ id }, { relations: ['user'] });
        }
        async getCourierById(id) {
            return this.courierRepository.findOneOrFail({ id }, { relations: ['user', 'revision'] });
        }
        async getCourierByIdOrThrow(id) {
            const courier = await this.getCourierById(id);
            if (!courier)
                throw new SpoonError_1.default(`Courier with id ${id} not found`);
            return courier;
        }
        async updateLocation(userId, latLng) {
            await this.repository.update(userId, { lat: latLng.lat, lng: latLng.lng });
        }
        async updateClientInformation(id, name, email, phoneNumber) {
            const client = await this.getClientById(id);
            await this.repository.update(client.userId, {
                name,
                email,
                phoneNumber,
            });
        }
        async updateCourierInformation(id, name, email, phoneNumber) {
            const courier = await this.getCourierById(id);
            await this.repository.update(courier.userId, {
                name,
                email,
                phoneNumber,
            });
        }
        async getClients() {
            return this.clientRepository.find({ relations: ['user'] });
        }
        async getCouriers(filter) {
            const ordersInProgressQuery = this.orderRepository
                .createQueryBuilder('o')
                .andWhere('o.state <> :state', { state: Order_2.OrderState.Completed })
                .select(['c.id']);
            let queryBuilder = this.courierRepository.createQueryBuilder('c');
            if (filter) {
                if (filter.withoutActiveOrders) {
                    queryBuilder = queryBuilder.where(`NOT EXISTS (${ordersInProgressQuery.getQuery()})`, ordersInProgressQuery.getParameters());
                }
            }
            return queryBuilder
                .leftJoinAndSelect('c.user', 'user')
                .leftJoinAndSelect('c.revision', 'revision')
                .getMany();
        }
        async getEnabledAdmins() {
            return this.adminRepository.find({ where: { isEnabled: true }, relations: ['user'] });
        }
        async updateUser(userId, data) {
            await this.repository.update(userId, data);
        }
        async updateUserImage(userId, imageId) {
            await this.repository.update(userId, {
                imageId,
            });
        }
    };
    UserStore = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectConnection()),
        __param(1, typeorm_1.InjectRepository(User_1.default)),
        __param(2, typeorm_1.InjectRepository(Client_1.default)),
        __param(3, typeorm_1.InjectRepository(Courier_1.default)),
        __param(4, typeorm_1.InjectRepository(Order_1.default)),
        __param(5, typeorm_1.InjectRepository(Address_1.default)),
        __param(6, typeorm_1.InjectRepository(Admin_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Connection,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository])
    ], UserStore);
    return UserStore;
})();
exports.default = UserStore;
//# sourceMappingURL=UserStore.js.map