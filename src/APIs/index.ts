import { Router } from "express";
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

const router = Router();
router.use("/", userApi);
router.use("/", bookApi);
router.use("/", bookTypeApi);
router.use("/", cityApi);
router.use("/", provinceApi);
router.use("/", festivalApi);
router.use("/", calendarApi);
router.use("/", dashboardApi);
router.use("/", contactApi);
router.use("/", khamkhom);

export default router;
