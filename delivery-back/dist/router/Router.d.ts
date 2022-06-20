import IRouter, { Absolute } from './IRouter';
import { IConfigService } from '@spryrocks/config-node';
export default class Router extends IRouter {
    private readonly configService;
    private readonly globalPrefix;
    constructor(configService: IConfigService);
    getSuccessOrderPaymentRoute(queries: {
        orderId: string;
    }, options: {
        absolute: Absolute;
    }): string;
    getOrderPaymentCompletedRoute(queries: {
        orderId: string;
    }): string;
    private constructUri;
}
