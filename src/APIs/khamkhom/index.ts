import { createKhamkhomController, deleteKhamkhomController, getKhamkhomController, randomKhamkhomController, getKhamkhomControllerByUserId, updateKhamkhomController } from './controllers';
import { validateSchema, validateResults, } from './validate';
import { verify } from '../../utils/jwt';
import { Router } from 'express'
import { randomKhamkhomService } from './services';


const router = Router()

router.get('/khamkhom/random', randomKhamkhomController)
router.get('/khamkhom', getKhamkhomController)
router.post('/khamkhom/update', verify, validateSchema, validateResults, updateKhamkhomController)
router.delete('/khamkhom/delete/:id', verify, deleteKhamkhomController)
router.get('/khamkhom/by-user-id', verify, getKhamkhomControllerByUserId)
router.post('/khamkhom/create', verify, validateSchema, validateResults, createKhamkhomController)


export default router
