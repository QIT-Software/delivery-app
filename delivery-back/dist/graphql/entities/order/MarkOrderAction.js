"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkOrderAction = void 0;
const graphql_1 = require("@nestjs/graphql");
var MarkOrderAction;
(function (MarkOrderAction) {
    MarkOrderAction["CheckIn"] = "checkin";
    MarkOrderAction["CheckOut"] = "checkout";
})(MarkOrderAction = exports.MarkOrderAction || (exports.MarkOrderAction = {}));
graphql_1.registerEnumType(MarkOrderAction, { name: 'MarkOrderAction' });
//# sourceMappingURL=MarkOrderAction.js.map