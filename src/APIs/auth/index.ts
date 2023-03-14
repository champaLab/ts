import { Router } from 'express'
import { verify } from '../../utils/jwt'
import { validateLogin, validateResults, validateUserRegister, validateUserSendMail, validateVerify } from '../users/validate'
import { userLoginController, getMeController, userVerifyController, userRegisterController, userResendCodeWhatsappController, userResendCodeEmailController } from './controllers'

const router = Router()

// router.post('/auth/login', validateLogin, validateResults, userLoginController)
router.post('/auth/verify', userVerifyController)
// router.post('/auth/verify', validateVerify, validateResults, userVerifyController)
// router.post("/auth/register", validateUserRegister, validateResults, userRegisterController);
// router.post("/auth/email-send-pin", validateUserSendMail, validateResults, userResendCodeEmailController);
// router.post("/auth/whatsapp-send-pin", validateUserRegister, validateResults, userResendCodeWhatsappController);
// router.post('/me', verify, getMeController)

export default router
