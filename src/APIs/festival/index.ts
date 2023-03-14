import { createFestivalController, getFestivalController, removeFestivalController } from './controllers';
import { validateSchema, validateResults, } from './validate';
import { verify } from '../../utils/jwt';
import { Router } from 'express'

const router = Router()

router.get('/festival/', verify, getFestivalController)
router.post('/festival/create/', verify, validateSchema, validateResults, createFestivalController)
router.delete('/festival/delete/:id', verify, removeFestivalController)

export default router
