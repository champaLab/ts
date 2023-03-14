import { getCityController, createCityController, getCityByProIdController, updateCityController, removeCityController } from './controllers';
import { validateSchema, validateResults, validateGetCitiesSchema } from './validate';
import { verify } from '../../utils/jwt';
import { Router } from 'express'

const router = Router()

router.get('/cities/', verify, getCityController)
router.post('/cities', verify, validateGetCitiesSchema, validateResults, getCityByProIdController)
router.post('/cities/create/', verify, validateSchema, validateResults, createCityController)
router.post('/cities/update/', verify, validateSchema, validateResults, updateCityController)
router.delete('/cities/delete/:id', verify, removeCityController)

export default router
