"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./prisma"));
const app = (0, express_1.default)();
app.get('/', async (req, res) => {
    let pro = await prisma_1.default.tbl_provinces.findMany();
    return res.send(pro);
});
app.get('/a', async (req, res) => {
    let pro = await prisma_1.default.tbl_provinces.findMany();
    return res.send(pro);
});
const port = 3000;
app.listen(port, () => {
    console.log("server listening on port " + port);
});
