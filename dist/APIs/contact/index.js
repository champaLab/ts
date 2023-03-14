"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/contact/', controllers_1.getContactController);
exports.default = router;
