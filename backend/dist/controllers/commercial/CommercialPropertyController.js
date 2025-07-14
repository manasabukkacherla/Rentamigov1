"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialPropertyController = void 0;
const PropertyController_1 = require("../base/PropertyController");
class CommercialPropertyController extends PropertyController_1.PropertyController {
    constructor(model, prefix) {
        super(model, prefix);
    }
}
exports.CommercialPropertyController = CommercialPropertyController;
