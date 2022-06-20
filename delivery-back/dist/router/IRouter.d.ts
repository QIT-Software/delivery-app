export declare const Routes: {
    payment: {
        prefix: string;
        login: {
            path: string;
            query_code: string;
        };
        successOrder: {
            path: string;
            query_orderId: string;
        };
        successWashing: {
            path: string;
            query_orderId: string;
        };
        successTips: {
            path: string;
            query_orderId: string;
        };
        successOrderCompleted: {
            path: string;
            query_orderId: string;
        };
        successWashingCompleted: {
            path: string;
            query_orderId: string;
        };
        successTipsCompleted: {
            path: string;
            query_orderId: string;
        };
    };
    login: {
        prefix: string;
        successPaypalLoginCompleted: {
            path: string;
            query_code: string;
        };
    };
};
export declare type Absolute = {
    baseUrl: string;
};
declare type RouteOptions = {
    absolute?: Absolute;
};
export default abstract class IRouter {
    abstract getSuccessOrderPaymentRoute(queries: {
        orderId: string;
    }, options?: RouteOptions): string;
    abstract getOrderPaymentCompletedRoute(queries: {
        orderId: string;
    }): string;
}
export {};
