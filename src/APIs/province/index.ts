import { getProvinceController, createProvinceController, updateProvinceController, removeProvinceController } from './controllers';
import { validateSchema, validateResults } from './validate';
import { verify } from '../../utils/jwt';
import { Router } from 'express'

const router = Router()

router.get('/provinces/', verify, getProvinceController)
router.post('/provinces/create/', verify, validateSchema, validateResults, createProvinceController)
router.post('/provinces/update/', verify, validateSchema, validateResults, updateProvinceController)
router.delete('/provinces/delete/:id', verify, removeProvinceController)

export default router
