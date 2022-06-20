"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentsVerificationRequestedMessage = exports.createDocumentsRevisionEvaluatedMessage = exports.createOrderCompletedFirebaseMessage = exports.createOrderReadyToDeliveryFromLaundryFirebaseMessage = exports.createOrderAcceptedByLaundryFirebaseMessage = exports.createOrderDeliveredFirebaseMessage = exports.createOrderDeliveringFirebaseMessage = exports.createAcceptOrderFirebaseMessage = exports.createNewOrderCreatedMessage = void 0;
const FirebaseMessage_1 = __importDefault(require("../../firebase/FirebaseMessage"));
const Order_1 = __importDefault(require("../../../entities/Order"));
const Document_1 = require("../../../entities/Document");
const Courier_1 = __importDefault(require("../../../entities/Courier"));
const createData = (data) => data;
const createMessage = (message) => message;
exports.createNewOrderCreatedMessage = (order) => createMessage({
    title: 'New deliveries available',
    body: `Please review and accept it`,
    data: createData({
        action: 'newOrderIsAvailable',
        orderId: order.id,
    }),
});
exports.createAcceptOrderFirebaseMessage = (orderId, number, courierId) => createMessage({
    title: `Order accepted`,
    body: `Courier has accepted your order and is in route`,
    data: {
        action: 'acceptedByCourier',
        orderId,
        courierId,
    },
});
exports.createOrderDeliveringFirebaseMessage = (order, type) => createMessage({
    title: 'Order is delivering',
    body: `Your order is on the way to the laundry`,
    data: createData({
        action: 'checkedIn',
        orderId: order.id,
        type,
    }),
});
exports.createOrderDeliveredFirebaseMessage = (order, type) => createMessage({
    title: 'Order is delivered!',
    body: `Your order has delivered to the laundry!`,
    data: createData({
        action: 'checkedOut',
        orderId: order.id,
        type,
    }),
});
exports.createOrderAcceptedByLaundryFirebaseMessage = (order, type) => {
    var _a;
    return createMessage({
        title: 'Laundry has accepted your order',
        body: `Your order ${order.number} to ${(_a = order.restaurant) === null || _a === void 0 ? void 0 : _a.description} was accepted`,
        data: createData({
            action: 'checkedIn',
            orderId: order.id,
            type,
        }),
    });
};
exports.createOrderReadyToDeliveryFromLaundryFirebaseMessage = (order, type) => {
    var _a;
    return createMessage({
        title: 'Order is ready to delivery to client',
        body: `Your order ${order.number} is ready to delivery from ${(_a = order.restaurant) === null || _a === void 0 ? void 0 : _a.description}`,
        data: createData({
            action: 'checkedOut',
            orderId: order.id,
            type,
        }),
    });
};
exports.createOrderCompletedFirebaseMessage = (order) => {
    var _a;
    return createMessage({
        title: `Order ${order.number} is completed `,
        body: `Your order ${order.number} from ${(_a = order.restaurant) === null || _a === void 0 ? void 0 : _a.description} is completed`,
        data: createData({
            action: 'orderCompleted',
            orderId: order.id,
        }),
    });
};
exports.createDocumentsRevisionEvaluatedMessage = (status, comment) => createMessage({
    title: 'Documents evaluation',
    body: 'Your documents evaluated successfully',
    data: {
        action: 'documentsRevisionEvaluated',
        status,
        comment,
    },
});
exports.createDocumentsVerificationRequestedMessage = (courier) => createMessage({
    title: 'Documents verification',
    body: `Courier ${courier.user.name} requested documents verification`,
    data: {
        action: 'documentsVerificationRequested',
        courierId: courier.id,
    },
});
//# sourceMappingURL=FirebaseMessages.js.map