"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAuthResponseToApi = void 0;
exports.mapAuthResponseToApi = (response) => ({
    jwt: response.jwt,
    refreshToken: response.refreshToken,
});
//# sourceMappingURL=Mappers.js.map