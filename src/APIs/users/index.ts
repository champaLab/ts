import { verify } from "./../../utils/jwt";
import { Router } from "express";
import {
    userCreateController,
    getUsersController,
    updateUserController,
    updateUserStatusCtrl,
    deleteUserController,
    updateUserProfile,
    userVerifyController,

} from "./controllers";
import { validateUser, validateResults, validateUserUpdate, } from "./validate";

const router = Router();

// router.use("/auth", authApi);
router.post("/users/create", verify, validateUser, validateResults, userCreateController);
router.get("/users/", verify, getUsersController);
router.post("/users/update/profile/", verify, updateUserProfile);
router.patch("/users/update/", verify, validateUserUpdate, validateResults, updateUserController);
router.patch("/users/:u_id/update/status/", verify, updateUserStatusCtrl);
router.delete("/users/:u_id/delete/", verify, deleteUserController);
router.post('/auth/verify', userVerifyController)

export default router;
