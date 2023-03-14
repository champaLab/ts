"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
// router.post('/auth/login', validateLogin, validateResults, userLoginController)
router.post('/auth/verify', controllers_1.userVerifyController);
// router.post('/auth/verify', validateVerify, validateResults, userVerifyController)
// router.post("/auth/register", validateUserRegister, validateResults, userRegisterController);
// router.post("/auth/email-send-pin", validateUserSendMail, validateResults, userResendCodeEmailController);
// router.post("/auth/whatsapp-send-pin", validateUserRegister, validateResults, userResendCodeWhatsappController);
// router.post('/me', verify, getMeController)
exports.default = router;
