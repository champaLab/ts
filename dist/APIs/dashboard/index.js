"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../../utils/jwt");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.get("/admin/dashboard/stats", jwt_1.verify, controllers_1.getStatsController);
exports.default = router;
