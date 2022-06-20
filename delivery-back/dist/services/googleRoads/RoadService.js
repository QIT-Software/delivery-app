"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IRoadsService_1 = __importDefault(require("./IRoadsService"));
const SpoonError_1 = __importDefault(require("../../SpoonError"));
class RoadsService extends IRoadsService_1.default {
    constructor(client) {
        super();
        this.client = client;
    }
    async getDistanceMeters(origin, destination) {
        const result = await this.client
            .directions({
            origin,
            destination,
            mode: 'driving',
        })
            .asPromise();
        if (result.status !== 200) {
            throw new SpoonError_1.default(`Bad directions http response status: ${result.status}`);
        }
        if (result.json.status !== 'OK') {
            throw new SpoonError_1.default(`Bad directions json response status: ${result.json.status}`);
        }
        const { json } = result;
        if (json.routes.length < 1) {
            throw new SpoonError_1.default('There are no routes in the response');
        }
        const route = json.routes[0];
        if (route.legs.length < 1) {
            throw new SpoonError_1.default('There are no route legs in the response');
        }
        const leg = route.legs[0];
        return leg.distance.value;
    }
}
exports.default = RoadsService;
//# sourceMappingURL=RoadService.js.map