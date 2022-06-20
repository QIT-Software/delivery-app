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
exports.GraphqlModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const StoresModule_1 = require("../database/stores/StoresModule");
const AccountResolver_1 = require("./resolvers/AccountResolver");
const RestaurantResolver_1 = __importDefault(require("./resolvers/RestaurantResolver"));
const CuisineResolver_1 = __importDefault(require("./resolvers/CuisineResolver"));
const SetResolver_1 = __importDefault(require("./resolvers/SetResolver"));
const DishResolver_1 = __importDefault(require("./resolvers/DishResolver"));
const IngredientResolver_1 = __importDefault(require("./resolvers/IngredientResolver"));
const ManagerModule_1 = require("../managers/ManagerModule");
const EnhancersModule_1 = require("../enhancers/EnhancersModule");
const core_1 = require("@nestjs/core");
const RouterModule_1 = require("../router/RouterModule");
const BagResolver_1 = __importDefault(require("./resolvers/BagResolver"));
const OrderResolver_1 = __importDefault(require("./resolvers/OrderResolver"));
const PaymentResolver_1 = require("./resolvers/PaymentResolver");
const PreferencesResolver_1 = require("./resolvers/PreferencesResolver");
const UserResolver_1 = __importDefault(require("./resolvers/UserResolver"));
const CartResolver_1 = __importDefault(require("./resolvers/CartResolver"));
const LocationResolver_1 = require("./resolvers/LocationResolver");
const StatusResolver_1 = __importDefault(require("./resolvers/StatusResolver"));
const DocumentResolver_1 = __importDefault(require("./resolvers/DocumentResolver"));
const EmailForSpamResolver_1 = require("./resolvers/EmailForSpamResolver");
let GraphqlModule = (() => {
    let GraphqlModule = class GraphqlModule {
    };
    GraphqlModule = __decorate([
        common_1.Module({
            imports: [
                graphql_1.GraphQLModule.forRoot({
                    autoSchemaFile: 'schema.graphql',
                    tracing: true,
                    context: (context) => context,
                    useGlobalPrefix: true,
                }),
                ManagerModule_1.ManagerModule,
                EnhancersModule_1.EnhancersModule,
                RouterModule_1.RouterModule,
                StoresModule_1.StoresModule,
            ],
            providers: [
                {
                    provide: core_1.APP_PIPE,
                    useClass: common_1.ValidationPipe,
                },
                AccountResolver_1.AccountResolver,
                RestaurantResolver_1.default,
                CuisineResolver_1.default,
                SetResolver_1.default,
                DishResolver_1.default,
                IngredientResolver_1.default,
                BagResolver_1.default,
                OrderResolver_1.default,
                PaymentResolver_1.PaymentResolver,
                UserResolver_1.default,
                PreferencesResolver_1.PreferencesResolver,
                CartResolver_1.default,
                LocationResolver_1.LocationResolver,
                StatusResolver_1.default,
                DocumentResolver_1.default,
                EmailForSpamResolver_1.EmailForSpamResolver,
            ],
        })
    ], GraphqlModule);
    return GraphqlModule;
})();
exports.GraphqlModule = GraphqlModule;
//# sourceMappingURL=GraphqlModule.js.map