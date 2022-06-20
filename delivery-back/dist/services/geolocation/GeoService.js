"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IGeoService_1 = __importDefault(require("./IGeoService"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const Coordinate_1 = require("tsgeo/Coordinate");
const Vincenty_1 = require("tsgeo/Distance/Vincenty");
class GeoService extends IGeoService_1.default {
    async getDistanceMeters(origin, destination) {
        const originPlace = new Coordinate_1.Coordinate(origin.lat, origin.lng);
        const destinationPlace = new Coordinate_1.Coordinate(destination.lat, destination.lng);
        const result = originPlace.getDistance(destinationPlace, new Vincenty_1.Vincenty());
        if (result === 0) {
            throw new SpoonError_1.default(`It is exactly the same place`);
        }
        return result;
    }
}
exports.default = GeoService;
//# sourceMappingURL=GeoService.js.map