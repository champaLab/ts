"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./../../utils/jwt");
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.post("/users/create", jwt_1.verify, validate_1.validateUser, validate_1.validateResults, controllers_1.userCreateController);
router.get("/users/", jwt_1.verify, controllers_1.getUsersController);
router.post("/users/update/profile/", jwt_1.verify, controllers_1.updateUserProfile);
router.patch("/users/update/", jwt_1.verify, validate_1.validateUserUpdate, validate_1.validateResults, controllers_1.updateUserController);
router.patch("/users/:u_id/update/status/", jwt_1.verify, controllers_1.updateUserStatusCtrl);
router.delete("/users/:u_id/delete/", jwt_1.verify, controllers_1.deleteUserController);
exports.default = router;
