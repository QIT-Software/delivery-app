"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLaundryMassage = exports.createCourierMassage = exports.createDocumentsRejectedMessage = exports.createDocumentsApprovedMessage = exports.createSuccessRegistrationMessage = exports.createNewPasswordMessage = void 0;
const EmailMessage_1 = __importDefault(require("../../emailSender/EmailMessage"));
function createNewPasswordMessage(newPassword) {
    return {
        template: 'NewPassword',
        subject: 'Spoon And Fork Delivery - New Password',
        context: {
            newPassword,
        },
    };
}
exports.createNewPasswordMessage = createNewPasswordMessage;
function createSuccessRegistrationMessage(userName) {
    return {
        template: 'NewUser',
        subject: `Spoon And Fork Delivery - Welcome in our service`,
        context: {
            userName,
        },
    };
}
exports.createSuccessRegistrationMessage = createSuccessRegistrationMessage;
function createDocumentsApprovedMessage(courierName) {
    return {
        template: 'DocumentApproved',
        subject: 'Klean Service - Documents Revision Evaluated',
        context: {
            courierName,
        },
    };
}
exports.createDocumentsApprovedMessage = createDocumentsApprovedMessage;
function createDocumentsRejectedMessage(courierName, comment) {
    return {
        template: 'DocumentRejected',
        subject: 'Klean Service - Documents Revision Rejected',
        context: {
            courierName,
            comment,
        },
    };
}
exports.createDocumentsRejectedMessage = createDocumentsRejectedMessage;
function createCourierMassage(userName) {
    return {
        template: 'NewCourier',
        subject: 'New courier created an account',
        context: {
            userName,
        },
    };
}
exports.createCourierMassage = createCourierMassage;
function createLaundryMassage(userName) {
    return {
        template: 'NewLaundry',
        subject: 'New laundry created an account',
        context: {
            userName,
        },
    };
}
exports.createLaundryMassage = createLaundryMassage;
//# sourceMappingURL=EmailMessages.js.map