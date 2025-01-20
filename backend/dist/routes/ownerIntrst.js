"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const owner_intrst_1 = __importDefault(require("../models/owner-intrst")); // Adjust the path as necessary
const ownerIntrstrouter = express_1.default.Router();
// Route to create a new property
ownerIntrstrouter.post("/owner-intrst-form", async (req, res) => {
    try {
        const property = new owner_intrst_1.default(req.body);
        await property.save();
        res.status(201).send(property);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Route to get all properties
ownerIntrstrouter.get("/owner-intrst-form", async (req, res) => {
    try {
        const properties = await owner_intrst_1.default.find();
        res.status(200).send(properties);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = ownerIntrstrouter;
