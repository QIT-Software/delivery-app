"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPlacement = exports.OrderState = void 0;
const Cart_1 = __importDefault(require("./Cart"));
var OrderState;
(function (OrderState) {
    OrderState["WaitingForPayment"] = "WaitingForPayment";
    OrderState["ReadyForDelivery"] = "ReadyForDelivery";
    OrderState["AcceptedByCourier"] = "AcceptedByCourier";
    OrderState["AcceptedByRestaurant"] = "AcceptedByRestaurant";
    OrderState["Delivering"] = "Delivering";
    OrderState["Delivered"] = "Delivered";
    OrderState["Completed"] = "Completed";
})(OrderState = exports.OrderState || (exports.OrderState = {}));
var OrderPlacement;
(function (OrderPlacement) {
    OrderPlacement["Client"] = "Client";
    OrderPlacement["Restaurant"] = "Restaurant";
})(OrderPlacement = exports.OrderPlacement || (exports.OrderPlacement = {}));
//# sourceMappingURL=Order.js.map