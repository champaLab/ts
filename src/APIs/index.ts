import { Router } from "express";
import test from "./test";
import userApi from "./users";
import bookApi from "./book";
import bookTypeApi from "./bookTypes";
import provinceApi from "./province";
import cityApi from "./city";
import calendarApi from "./calendar";
import festivalApi from "./festival";
import dashboardApi from "./dashboard";
import contactApi from "./contact";
import khamkhom from "./khamkhom";
// import auth from "./auth";

const router = Router();
router.use("/", test);
router.use("/", userApi);
// router.use("/", auth);
// router.use("/", bookApi);
router.use("/", bookTypeApi);
router.use("/", cityApi);
router.use("/", provinceApi);
router.use("/", festivalApi);
router.use("/", calendarApi);
router.use("/", dashboardApi);
router.use("/", contactApi);
router.use("/", khamkhom);

export default router;
