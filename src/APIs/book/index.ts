

import { createBookController, editorGetNewBookController, removeBookController, getBookByBookTypeController, updateBookController, getMyBookController, adminApproveBookController, editorApproveBookController, adminGetNewBookController, getBookSearchController, } from './controllers';
import { validateSchema, validateSearchSchema, validateResults } from './validate';
import { verify } from './../../utils/jwt';
import { Router } from 'express'

const router = Router()

router.post('/books/search', validateSearchSchema, validateResults, getBookSearchController)
router.get('/get-books-by-type/:id', getBookByBookTypeController)
router.get('/new-books', verify, editorGetNewBookController)
router.get('/admin-new-books', verify, adminGetNewBookController)
router.post('/admin-approve-books', verify, adminApproveBookController)
router.post('/editor-approve-books', verify, editorApproveBookController)
router.get('/my-books', verify, getMyBookController)
router.post('/books/create/', verify, validateSchema, validateResults, createBookController)
router.post('/books/update/', verify, validateSchema, validateResults, updateBookController)
router.delete('/books/delete/:id', verify, removeBookController)


export default router
