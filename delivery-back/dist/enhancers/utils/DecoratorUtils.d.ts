import { Request } from 'express';
export declare const createParamDecorator: (func: (request: Request | any) => any) => (...dataOrPipes: any[]) => ParameterDecorator;
