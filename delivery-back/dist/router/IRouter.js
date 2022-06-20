"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
exports.Routes = {
    payment: {
        prefix: 'paypal',
        login: {
            path: 'success/login',
            query_code: 'code',
        },
        successOrder: {
            path: 'success/order',
            query_orderId: 'orderId',
        },
        successWashing: {
            path: 'success/washing',
            query_orderId: 'orderId',
        },
        successTips: {
            path: 'success/tips',
            query_orderId: 'orderId',
        },
        successOrderCompleted: {
            path: 'success/order/completed',
            query_orderId: 'orderId',
        },
        successWashingCompleted: {
            path: 'success/washing/completed',
            query_orderId: 'orderId',
        },
        successTipsCompleted: {
            path: 'success/tips/completed',
            query_orderId: 'orderId',
        },
    },
    login: {
        prefix: 'login',
        successPaypalLoginCompleted: {
            path: 'success/paypal/login/completed',
            query_code: 'code',
        },
    },
};
class IRouter {
}
exports.default = IRouter;
//# sourceMappingURL=IRouter.js.map