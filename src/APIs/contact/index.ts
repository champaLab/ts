import { getContactController, } from './controllers';
import { validateSchema, validateResults, } from './validate';
import { verify } from '../../utils/jwt';
import { Router } from 'express'

const router = Router()

router.get('/contact/', getContactController)

export default router
