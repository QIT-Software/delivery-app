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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IFirebaseService_1 = __importStar(require("./IFirebaseService"));
const FirebaseAdmin = __importStar(require("firebase-admin"));
const Common_1 = require("../../entities/Common");
const common_1 = require("@nestjs/common");
const ISessionStore_1 = __importDefault(require("../../database/stores/session/ISessionStore"));
const FirebaseMessage_1 = __importStar(require("./FirebaseMessage"));
let FirebaseService = (() => {
    var FirebaseService_1;
    let FirebaseService = FirebaseService_1 = class FirebaseService extends IFirebaseService_1.default {
        constructor(sessionStore) {
            super();
            this.sessionStore = sessionStore;
        }
        async sendMulticastNotification(tokens, message) {
            if (tokens.length < 1)
                return;
            await FirebaseAdmin.messaging().sendMulticast(Object.assign(Object.assign({}, FirebaseService_1.setupNotificationMessageObject(message)), { tokens }));
            await FirebaseAdmin.messaging().sendMulticast(Object.assign(Object.assign({}, FirebaseService_1.setupDataMessageObject(message)), { tokens }));
        }
        async sendNotificationToUser(userId, message, options) {
            const tokens = await this.sessionStore.getUserFirebaseTokens(userId, options.appTypes);
            await this.sendMulticastNotification(tokens, message);
        }
        async sendNotificationToUsers(userIds, message, options) {
            const tokens = await this.sessionStore.getUsersFirebaseTokens(userIds, options.appTypes);
            await this.sendMulticastNotification(tokens, message);
        }
        static setupNotificationMessageObject(message) {
            return {
                notification: {
                    title: message.title,
                    body: message.body,
                },
                android: {
                    priority: 'high',
                    notification: {
                        defaultSound: true,
                        defaultVibrateTimings: true,
                    },
                },
            };
        }
        static setupDataMessageObject(message) {
            return {
                data: message.data,
                android: {
                    priority: 'high',
                },
            };
        }
    };
    FirebaseService = FirebaseService_1 = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [ISessionStore_1.default])
    ], FirebaseService);
    return FirebaseService;
})();
exports.default = FirebaseService;
//# sourceMappingURL=FirebaseService.js.map