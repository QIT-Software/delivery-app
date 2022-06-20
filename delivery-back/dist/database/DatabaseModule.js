"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = __importDefault(require("./entities/User"));
const LocalLogin_1 = __importDefault(require("./entities/LocalLogin"));
const Session_1 = __importDefault(require("./entities/Session"));
const File_1 = __importDefault(require("./entities/File"));
const Address_1 = __importDefault(require("./entities/Address"));
const Ingredient_1 = __importDefault(require("./entities/Ingredient"));
const Dish_1 = __importDefault(require("./entities/Dish"));
const Set_1 = __importDefault(require("./entities/Set"));
const Admin_1 = __importDefault(require("./entities/Admin"));
const Document_1 = __importDefault(require("./entities/Document"));
const DocumentsRevision_1 = __importDefault(require("./entities/DocumentsRevision"));
const Cuisine_1 = __importDefault(require("./entities/Cuisine"));
const Restaurant_1 = __importDefault(require("./entities/Restaurant"));
const IncomePayment_1 = __importDefault(require("./entities/IncomePayment"));
const RequestedIncomePayment_1 = __importDefault(require("./entities/RequestedIncomePayment"));
const Bag_1 = __importDefault(require("./entities/Bag"));
const Order_1 = __importDefault(require("./entities/Order"));
const config_node_1 = require("@spryrocks/config-node");
const ConfigModule_1 = require("../services/config/ConfigModule");
const Client_1 = __importDefault(require("./entities/Client"));
const Courier_1 = __importDefault(require("./entities/Courier"));
const Status_1 = __importDefault(require("./entities/Status"));
const OrderInfo_1 = __importDefault(require("./entities/OrderInfo"));
const OrderMark_1 = __importDefault(require("./entities/OrderMark"));
const Cart_1 = __importDefault(require("./entities/Cart"));
const Preferences_1 = __importDefault(require("./entities/Preferences"));
const EmailsForSpam_1 = __importDefault(require("./entities/EmailsForSpam"));
const entities = [
    User_1.default,
    Preferences_1.default,
    LocalLogin_1.default,
    Session_1.default,
    File_1.default,
    Address_1.default,
    Ingredient_1.default,
    Status_1.default,
    Dish_1.default,
    Set_1.default,
    Cuisine_1.default,
    Restaurant_1.default,
    IncomePayment_1.default,
    RequestedIncomePayment_1.default,
    Bag_1.default,
    Order_1.default,
    Client_1.default,
    Courier_1.default,
    OrderInfo_1.default,
    OrderMark_1.default,
    Cart_1.default,
    Admin_1.default,
    Document_1.default,
    DocumentsRevision_1.default,
    EmailsForSpam_1.default,
];
const options = (configService) => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.getNumber('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    synchronize: configService.getBoolean('DATABASE_SYNCHRONIZE', false),
    logging: 'all',
    entities,
});
let DatabaseModule = (() => {
    let DatabaseModule = class DatabaseModule {
    };
    DatabaseModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [ConfigModule_1.ConfigModule],
                    inject: [config_node_1.IConfigService],
                    useFactory: options,
                }),
                typeorm_1.TypeOrmModule.forFeature(entities),
            ],
            exports: [
                typeorm_1.TypeOrmModule,
            ],
        })
    ], DatabaseModule);
    return DatabaseModule;
})();
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=DatabaseModule.js.map