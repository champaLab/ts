import { Router } from "express";
import { verify } from "../../utils/jwt";
import { getStatsController } from "./controllers";

const router = Router();

router.get("/admin/dashboard/stats", verify, getStatsController);

export default router;
