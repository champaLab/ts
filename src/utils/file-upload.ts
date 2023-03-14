import multer from 'multer'
import { diskStorage } from 'multer'
import { resolve } from 'path'
import environment from './../environment'
import dayjs from 'dayjs'


export const uploadFile = () => multer({
    storage: diskStorage({
        destination: resolve(`${environment.PWD}`),
        filename: (req, file, cb) => {
            const date = Date.now()
            const newFileName = file.originalname.trim().replace(' ', '').replace(',', '')
            cb(null, `${date}-${file.fieldname}-${newFileName}`)
        }
    }),
})

