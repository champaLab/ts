import { Router } from 'express'
import { verify } from '../../../utils/jwt'
import { validateLogin, validateResults, validateUserRegister, validateUserSendMail, validateVerify } from '../validate'
import { userLoginController, getMeController, userVerifyController, userRegisterController, userResendCodeWhatsappController, userResendCodeEmailController } from './controllers'

const router = Router()

router.post('/login', validateLogin, validateResults, userLoginController)
router.post('/verify', validateVerify, validateResults, userVerifyController)
router.post("/register", validateUserRegister, validateResults, userRegisterController);
router.post("/email-send-pin", validateUserSendMail, validateResults, userResendCodeEmailController);
router.post("/whatsapp-send-pin", validateUserRegister, validateResults, userResendCodeWhatsappController);
router.post('/me', verify, getMeController)

export default router
