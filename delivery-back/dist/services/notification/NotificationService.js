"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const INotificationService_1 = __importDefault(require("./INotificationService"));
const Common_1 = require("../../entities/Common");
const common_1 = require("@nestjs/common");
const IEmailSenderService_1 = require("../emailSender/IEmailSenderService");
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const EmailMessages_1 = require("./messages/EmailMessages");
const FirebaseMessages_1 = require("./messages/FirebaseMessages");
const Order_1 = __importDefault(require("../../entities/Order"));
const ISessionStore_1 = __importDefault(require("../../database/stores/session/ISessionStore"));
const IFirebaseService_1 = __importDefault(require("../firebase/IFirebaseService"));
const FirebaseMessage_1 = __importDefault(require("../firebase/FirebaseMessage"));
const AppType_1 = __importDefault(require("../../entities/AppType"));
const Courier_1 = __importDefault(require("../../entities/Courier"));
const Document_1 = require("../../entities/Document");
const Mappers_1 = require("../../database/entities/Mappers");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
let NotificationService = (() => {
    let NotificationService = class NotificationService extends INotificationService_1.default {
        constructor(userStore, sessionStore, mailerService, firebaseService) {
            super();
            this.userStore = userStore;
            this.sessionStore = sessionStore;
            this.mailerService = mailerService;
            this.firebaseService = firebaseService;
        }
        async sendRegistrationMessage(userName, email) {
            const message = EmailMessages_1.createSuccessRegistrationMessage(userName);
            await this.mailerService.sendMessage(email, message);
        }
        async sendNewPassword(userId, password) {
            const user = await this.userStore.getUserOrFail(userId);
            const message = EmailMessages_1.createNewPasswordMessage(password);
            await this.mailerService.sendMessage(user.email, message);
        }
        async sendDocumentsApprovedMessage(userId) {
            const user = await this.userStore.getUserOrFail(userId);
            const message = EmailMessages_1.createDocumentsApprovedMessage(user.name);
            await this.mailerService.sendMessage(user.email, message);
        }
        async sendDocumentsDocumentsRejectedMessage(userId, comment) {
            const user = await this.userStore.getUserOrFail(userId);
            const message = EmailMessages_1.createDocumentsRejectedMessage(user.name, comment);
            await this.mailerService.sendMessage(user.email, message);
        }
        async sendCreatedANewCourierMassage(userName) {
            const admins = await this.userStore.getEnabledAdmins();
            if (admins.length < 0)
                throw new SpoonError_1.default('No admin to confirm');
            const message = EmailMessages_1.createCourierMassage(userName);
            admins.map(async (admin) => {
                var _a, _b;
                if (!((_a = admin.user) === null || _a === void 0 ? void 0 : _a.email))
                    return;
                await this.mailerService.sendMessage((_b = admin.user) === null || _b === void 0 ? void 0 : _b.email, message);
            });
        }
        async sendCreatedANewRestaurantMassage(userName) {
            const admins = await this.userStore.getEnabledAdmins();
            if (admins.length < 0)
                throw new SpoonError_1.default('No admin to confirm');
            const message = EmailMessages_1.createLaundryMassage(userName);
            admins.map(async (admin) => {
                if (!admin.user)
                    return;
                await this.mailerService.sendMessage(admin.user.email, message);
            });
        }
        async sendOrderAccepted(order, type, courier) {
            await this.firebaseService.sendNotificationToUser(order.client.id, FirebaseMessages_1.createAcceptOrderFirebaseMessage(order.id, order.number, courier.id), {
                appTypes: [AppType_1.default.Client],
            });
        }
        async sendNewOrderCreated(order) {
            const couriers = await this.userStore.getCouriers({ withoutActiveOrders: true });
            await this.firebaseService.sendNotificationToUsers(couriers.map((c) => c.userId), FirebaseMessages_1.createNewOrderCreatedMessage(order), { appTypes: [AppType_1.default.Courier] });
        }
        async sendMarkOrder(order, type) {
            let userId;
            let message;
            let appTypes;
            if (type === 'restaurant') {
                userId = order.client.id;
                message = FirebaseMessages_1.createOrderDeliveringFirebaseMessage(order, type);
                appTypes = [AppType_1.default.Client, AppType_1.default.Restaurant];
            }
            if (!userId)
                throw new SpoonError_1.default('User id is not found');
            if (!message)
                throw new SpoonError_1.default('User id is not found');
            if (!appTypes)
                throw new SpoonError_1.default('User id is not found');
            await this.firebaseService.sendNotificationToUser(userId, message, { appTypes });
        }
        async sendDocumentsRevisionEvaluated(courier, status, comment) {
            const user = await this.userStore.getUserOrFail(courier.user.id);
            if (status === 'Approved') {
                const message = EmailMessages_1.createDocumentsApprovedMessage(user.name);
                await this.mailerService.sendMessage(user.email, message);
            }
            else if (status === 'Rejected') {
                const message = EmailMessages_1.createDocumentsRejectedMessage(user.name, comment);
                await this.mailerService.sendMessage(user.email, message);
            }
            await this.firebaseService.sendNotificationToUser(courier.user.id, FirebaseMessages_1.createDocumentsRevisionEvaluatedMessage(status, comment), { appTypes: [AppType_1.default.Courier] });
        }
        async sendDocumentsVerificationRequested(courier) {
            const admins = Mappers_1.mapAdminsFromDb(await this.userStore.getEnabledAdmins());
            if (admins.length <= 0)
                return;
            await this.firebaseService.sendNotificationToUsers(admins.map((a) => a.user.id), FirebaseMessages_1.createDocumentsVerificationRequestedMessage(courier), { appTypes: [AppType_1.default.Admin] });
        }
    };
    NotificationService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IUserStore_1.default,
            ISessionStore_1.default,
            IEmailSenderService_1.IEmailSenderService,
            IFirebaseService_1.default])
    ], NotificationService);
    return NotificationService;
})();
exports.default = NotificationService;
//# sourceMappingURL=NotificationService.js.map