"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../../prisma"));
const router = (0, express_1.Router)();
router.get('/a', async (req, res) => {
    let p = await prisma_1.default.tbl_cities.findMany({});
    return res.json(p);
});
exports.default = router;
