"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParamDecorator = void 0;
const common_1 = require("@nestjs/common");
const RequestExtractors_1 = require("../RequestExtractors");
exports.createParamDecorator = (func) => {
    return common_1.createParamDecorator((data, context) => {
        return func(RequestExtractors_1.getRequest(context));
    });
};
//# sourceMappingURL=DecoratorUtils.js.map