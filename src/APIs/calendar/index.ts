import { createCalendarController, getCalendarController, getDataForAddCalendarController, removeCalendarController, } from './controllers';
import { validateSchema, validateResults, } from './validate';
import { verify } from '../../utils/jwt';
import { Router } from 'express'
import { updateCalendarService } from './services';

const router = Router()

router.get('/calendars/',  getCalendarController)
router.post('/calendars/create/', verify, validateSchema, validateResults, createCalendarController)
router.delete('/calendars/delete/:id', verify, removeCalendarController)
router.post('/calendars/update', verify, validateSchema, validateResults, updateCalendarService)
router.get('/calendars/data-for-add', verify, getDataForAddCalendarController)

export default router
