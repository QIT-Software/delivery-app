"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const IRouter_1 = __importStar(require("./IRouter"));
const common_1 = require("@nestjs/common");
const config_node_1 = require("@spryrocks/config-node");
const q = (key, value) => ({ key, value });
let Router = (() => {
    let Router = class Router extends IRouter_1.default {
        constructor(configService) {
            super();
            this.configService = configService;
            this.globalPrefix = configService.getOptional('HTTP_GLOBAL_PREFIX');
        }
        getSuccessOrderPaymentRoute(queries, options) {
            const path = (() => {
                return IRouter_1.Routes.payment.successOrder.path;
            })();
            return this.constructUri(options ? options.absolute : undefined, [IRouter_1.Routes.payment.prefix, path], [q(IRouter_1.Routes.payment.successOrder.query_orderId, queries.orderId)]);
        }
        getOrderPaymentCompletedRoute(queries) {
            const schema = this.configService.get('LINKING_CLIENT_SCHEMA');
            const host = this.configService.get('LINKING_HOST');
            const path = (() => {
                return IRouter_1.Routes.payment.successOrderCompleted.path;
            })();
            return this.constructUri({ baseUrl: `${schema}://${host}` }, [IRouter_1.Routes.payment.prefix, path], [q(IRouter_1.Routes.payment.successOrderCompleted.query_orderId, queries.orderId)]);
        }
        constructUri(absolute, elements, queries) {
            let uri = '';
            if (absolute)
                uri += absolute.baseUrl;
            if (this.globalPrefix)
                uri += `/${this.globalPrefix}`;
            uri += elements.map((el) => `/${el}`).join('');
            if (queries)
                uri += `?${queries.map(({ key, value }) => `${key}=${value}`).join('')}`;
            return uri;
        }
    };
    Router = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [config_node_1.IConfigService])
    ], Router);
    return Router;
})();
exports.default = Router;
//# sourceMappingURL=Router.js.map