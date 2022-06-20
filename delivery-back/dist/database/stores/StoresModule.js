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
exports.StoresModule = void 0;
const common_1 = require("@nestjs/common");
const IUserStore_1 = __importDefault(require("./user/IUserStore"));
const UserStore_1 = __importDefault(require("./user/UserStore"));
const DatabaseModule_1 = require("../DatabaseModule");
const ILoginStore_1 = __importDefault(require("./login/ILoginStore"));
const LoginStore_1 = __importDefault(require("./login/LoginStore"));
const ISessionStore_1 = __importDefault(require("./session/ISessionStore"));
const SessionStore_1 = __importDefault(require("./session/SessionStore"));
const IFileStore_1 = __importDefault(require("./file/IFileStore"));
const FileStore_1 = __importDefault(require("./file/FileStore"));
const IAddressStore_1 = __importDefault(require("./address/IAddressStore"));
const AddressStore_1 = __importDefault(require("./address/AddressStore"));
const IIngredientStore_1 = __importDefault(require("./ingredient/IIngredientStore"));
const IngredientStore_1 = __importDefault(require("./ingredient/IngredientStore"));
const IDishStore_1 = __importDefault(require("./dish/IDishStore"));
const DishStore_1 = __importDefault(require("./dish/DishStore"));
const ISetStore_1 = __importDefault(require("./set/ISetStore"));
const SetStore_1 = __importDefault(require("./set/SetStore"));
const ICuisineStore_1 = __importDefault(require("./cuisine/ICuisineStore"));
const CuisineStore_1 = __importDefault(require("./cuisine/CuisineStore"));
const IRestaurantStore_1 = __importDefault(require("./restaurant/IRestaurantStore"));
const RestaurantStore_1 = __importDefault(require("./restaurant/RestaurantStore"));
const IPaymentStore_1 = __importDefault(require("./payment/IPaymentStore"));
const PaymentStore_1 = __importDefault(require("./payment/PaymentStore"));
const IBagStore_1 = __importDefault(require("./bag/IBagStore"));
const BagStore_1 = __importDefault(require("./bag/BagStore"));
const IOrderStore_1 = __importDefault(require("./order/IOrderStore"));
const OrderStore_1 = __importDefault(require("./order/OrderStore"));
const IStatusStore_1 = __importDefault(require("./status/IStatusStore"));
const StatusStore_1 = __importDefault(require("./status/StatusStore"));
const ICartStore_1 = __importDefault(require("./cart/ICartStore"));
const CartStore_1 = __importDefault(require("./cart/CartStore"));
const IPreferencesStore_1 = __importDefault(require("./preferences/IPreferencesStore"));
const PreferencesStore_1 = __importDefault(require("./preferences/PreferencesStore"));
const DocumentStore_1 = __importDefault(require("./document/DocumentStore"));
const IDocumentStore_1 = __importDefault(require("./document/IDocumentStore"));
const IEmailForSpamStore_1 = __importDefault(require("./emailForSpam/IEmailForSpamStore"));
const EmailForSpamStore_1 = __importDefault(require("./emailForSpam/EmailForSpamStore"));
let StoresModule = (() => {
    let StoresModule = class StoresModule {
    };
    StoresModule = __decorate([
        common_1.Module({
            imports: [
                DatabaseModule_1.DatabaseModule,
            ],
            providers: [
                {
                    provide: ISessionStore_1.default,
                    useClass: SessionStore_1.default,
                },
                {
                    provide: IUserStore_1.default,
                    useClass: UserStore_1.default,
                },
                {
                    provide: ILoginStore_1.default,
                    useClass: LoginStore_1.default,
                },
                {
                    provide: IFileStore_1.default,
                    useClass: FileStore_1.default,
                },
                {
                    provide: IAddressStore_1.default,
                    useClass: AddressStore_1.default,
                },
                {
                    provide: IIngredientStore_1.default,
                    useClass: IngredientStore_1.default,
                },
                {
                    provide: IStatusStore_1.default,
                    useClass: StatusStore_1.default,
                },
                {
                    provide: IDishStore_1.default,
                    useClass: DishStore_1.default,
                },
                {
                    provide: ISetStore_1.default,
                    useClass: SetStore_1.default,
                },
                {
                    provide: ICuisineStore_1.default,
                    useClass: CuisineStore_1.default,
                },
                {
                    provide: IRestaurantStore_1.default,
                    useClass: RestaurantStore_1.default,
                },
                {
                    provide: IBagStore_1.default,
                    useClass: BagStore_1.default,
                },
                {
                    provide: IOrderStore_1.default,
                    useClass: OrderStore_1.default,
                },
                {
                    provide: IPaymentStore_1.default,
                    useClass: PaymentStore_1.default,
                },
                {
                    provide: ICartStore_1.default,
                    useClass: CartStore_1.default,
                },
                {
                    provide: IPreferencesStore_1.default,
                    useClass: PreferencesStore_1.default,
                },
                {
                    provide: IDocumentStore_1.default,
                    useClass: DocumentStore_1.default,
                },
                {
                    provide: IEmailForSpamStore_1.default,
                    useClass: EmailForSpamStore_1.default,
                },
            ],
            exports: [
                ICartStore_1.default,
                ISessionStore_1.default,
                IUserStore_1.default,
                ILoginStore_1.default,
                IFileStore_1.default,
                IAddressStore_1.default,
                IIngredientStore_1.default,
                IPreferencesStore_1.default,
                IDishStore_1.default,
                ISetStore_1.default,
                ICuisineStore_1.default,
                IRestaurantStore_1.default,
                IBagStore_1.default,
                IOrderStore_1.default,
                IPaymentStore_1.default,
                IStatusStore_1.default,
                IDocumentStore_1.default,
                IEmailForSpamStore_1.default,
            ],
        })
    ], StoresModule);
    return StoresModule;
})();
exports.StoresModule = StoresModule;
//# sourceMappingURL=StoresModule.js.map