"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_1 = __importDefault(require("./test"));
// import userApi from "./users";
// import bookApi from "./book";
// import bookTypeApi from "./bookTypes";
// import provinceApi from "./province";
// import cityApi from "./city";
// import calendarApi from "./calendar";
// import festivalApi from "./festival";
// import dashboardApi from "./dashboard";
// import contactApi from "./contact";
// import khamkhom from "./khamkhom";
const router = (0, express_1.Router)();
router.use("/", test_1.default);
// router.use("/", userApi);
// router.use("/", bookApi);
// router.use("/", bookTypeApi);
// router.use("/", cityApi);
// router.use("/", provinceApi);
// router.use("/", festivalApi);
// router.use("/", calendarApi);
// router.use("/", dashboardApi);
// router.use("/", contactApi);
// router.use("/", khamkhom);
exports.default = router;
