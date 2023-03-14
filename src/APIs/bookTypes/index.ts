

import { createBookTypeController, getBookTypeController, removeBookTypeController } from './controllers';
import { validateSchema, validateResults } from './validate';
import { verify } from './../../utils/jwt';
import { Router } from 'express'
import { uploadFile } from '../../utils/file-upload';

const router = Router()

router.get('/book-types', getBookTypeController)
router.post('/book-types/create', verify, uploadFile().single('file'), validateSchema, validateResults, createBookTypeController)
router.post('/book-types/update', verify, validateSchema, validateResults, createBookTypeController)
router.delete('/book-types/delete/:id', verify, removeBookTypeController)

export default router
