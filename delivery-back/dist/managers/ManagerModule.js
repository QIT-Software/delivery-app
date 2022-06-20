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
exports.ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const StoresModule_1 = require("../database/stores/StoresModule");
const IAccountManager_1 = __importDefault(require("./account/IAccountManager"));
const AccountManager_1 = __importDefault(require("./account/AccountManager"));
const IIngredientManager_1 = __importDefault(require("./ingredient/IIngredientManager"));
const IngredientManager_1 = __importDefault(require("./ingredient/IngredientManager"));
const IDishManager_1 = __importDefault(require("./dish/IDishManager"));
const DishManager_1 = __importDefault(require("./dish/DishManager"));
const ISetManager_1 = __importDefault(require("./set/ISetManager"));
const SetManager_1 = __importDefault(require("./set/SetManager"));
const ICuisineManager_1 = __importDefault(require("./cuisine/ICuisineManager"));
const CuisineManager_1 = __importDefault(require("./cuisine/CuisineManager"));
const IRestaurantManager_1 = __importDefault(require("./restaurant/IRestaurantManager"));
const RestaurantManager_1 = __importDefault(require("./restaurant/RestaurantManager"));
const AuthModule_1 = require("./auth/AuthModule");
const ServicesModule_1 = require("../services/ServicesModule");
const IUserManager_1 = __importDefault(require("./user/IUserManager"));
const UserManager_1 = __importDefault(require("./user/UserManager"));
const IAddressManager_1 = __importDefault(require("./address/IAddressManager"));
const IOrderManager_1 = __importDefault(require("./order/IOrderManager"));
const IPaymentManager_1 = __importDefault(require("./payment/IPaymentManager"));
const IBagManager_1 = __importDefault(require("./bag/IBagManager"));
const AddressManager_1 = __importDefault(require("./address/AddressManager"));
const OrderManager_1 = __importDefault(require("./order/OrderManager"));
const PaymentManager_1 = __importDefault(require("./payment/PaymentManager"));
const BagManager_1 = __importDefault(require("./bag/BagManager"));
const GoogleRoadsModule_1 = require("../services/googleRoads/GoogleRoadsModule");
const GeoServiceModule_1 = require("../services/geolocation/GeoServiceModule");
const IFileManager_1 = __importDefault(require("./file/IFileManager"));
const FileManager_1 = __importDefault(require("./file/FileManager"));
const IStatusManager_1 = __importDefault(require("./status/IStatusManager"));
const StatusManager_1 = __importDefault(require("./status/StatusManager"));
const IPreferencesManager_1 = __importDefault(require("./preferences/IPreferencesManager"));
const PreferencesManager_1 = __importDefault(require("./preferences/PreferencesManager"));
const CartManager_1 = __importDefault(require("./cart/CartManager"));
const ICartManager_1 = __importDefault(require("./cart/ICartManager"));
const ILocationManager_1 = __importDefault(require("./location/ILocationManager"));
const LocationManager_1 = __importDefault(require("./location/LocationManager"));
const IDocumentManager_1 = __importDefault(require("./document/IDocumentManager"));
const DocumentManager_1 = __importDefault(require("./document/DocumentManager"));
const NotificationModule_1 = require("../services/notification/NotificationModule");
const IEmailFroSpam_1 = __importDefault(require("./emailForSpamManager/IEmailFroSpam"));
const EmailForSpam_1 = __importDefault(require("./emailForSpamManager/EmailForSpam"));
let ManagerModule = (() => {
    let ManagerModule = class ManagerModule {
    };
    ManagerModule = __decorate([
        common_1.Module({
            imports: [
                StoresModule_1.StoresModule,
                AuthModule_1.AuthModule,
                ServicesModule_1.ServicesModule,
                GoogleRoadsModule_1.GoogleRoadsModule,
                GeoServiceModule_1.GeoServiceModule,
                NotificationModule_1.NotificationModule,
            ],
            providers: [
                {
                    provide: IFileManager_1.default,
                    useClass: FileManager_1.default,
                },
                {
                    provide: IAccountManager_1.default,
                    useClass: AccountManager_1.default,
                },
                {
                    provide: IIngredientManager_1.default,
                    useClass: IngredientManager_1.default,
                },
                {
                    provide: IStatusManager_1.default,
                    useClass: StatusManager_1.default,
                },
                {
                    provide: IDishManager_1.default,
                    useClass: DishManager_1.default,
                },
                {
                    provide: ISetManager_1.default,
                    useClass: SetManager_1.default,
                },
                {
                    provide: ICuisineManager_1.default,
                    useClass: CuisineManager_1.default,
                },
                {
                    provide: IRestaurantManager_1.default,
                    useClass: RestaurantManager_1.default,
                },
                {
                    provide: IUserManager_1.default,
                    useClass: UserManager_1.default,
                },
                {
                    provide: IAddressManager_1.default,
                    useClass: AddressManager_1.default,
                },
                {
                    provide: IOrderManager_1.default,
                    useClass: OrderManager_1.default,
                },
                {
                    provide: IPaymentManager_1.default,
                    useClass: PaymentManager_1.default,
                },
                {
                    provide: IBagManager_1.default,
                    useClass: BagManager_1.default,
                },
                {
                    provide: IFileManager_1.default,
                    useClass: FileManager_1.default,
                },
                {
                    provide: IPreferencesManager_1.default,
                    useClass: PreferencesManager_1.default,
                },
                {
                    provide: ICartManager_1.default,
                    useClass: CartManager_1.default,
                },
                {
                    provide: ILocationManager_1.default,
                    useClass: LocationManager_1.default,
                },
                {
                    provide: IDocumentManager_1.default,
                    useClass: DocumentManager_1.default,
                },
                {
                    provide: IEmailFroSpam_1.default,
                    useClass: EmailForSpam_1.default,
                },
            ],
            exports: [
                ICartManager_1.default,
                IFileManager_1.default,
                AuthModule_1.AuthModule,
                IAccountManager_1.default,
                IIngredientManager_1.default,
                IDishManager_1.default,
                ISetManager_1.default,
                ICuisineManager_1.default,
                IRestaurantManager_1.default,
                IUserManager_1.default,
                IAddressManager_1.default,
                IOrderManager_1.default,
                IPaymentManager_1.default,
                IBagManager_1.default,
                AuthModule_1.AuthModule,
                IFileManager_1.default,
                IStatusManager_1.default,
                ILocationManager_1.default,
                IPreferencesManager_1.default,
                IDocumentManager_1.default,
                IEmailFroSpam_1.default,
            ],
        })
    ], ManagerModule);
    return ManagerModule;
})();
exports.ManagerModule = ManagerModule;
//# sourceMappingURL=ManagerModule.js.map