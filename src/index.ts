import express from 'express'
import cors from 'cors'
// import fs from 'fs-extra'
import bodyParser from 'body-parser'
import environment from './environment'
import { AddressInfo } from 'net'
import ApiRouter from './APIs'
import { join } from 'path'
// import { createStream } from 'rotating-file-stream'
import morgan from 'morgan'
// import dayjs from 'dayjs'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// whatsappBot()


// // Logs
// const logDir = join(__dirname, '../_logs')
// // Create log folder if not exists
// fs.existsSync(logDir) || fs.mkdirpSync(logDir)

// const accessLogStream = createStream(`${dayjs(new Date()).format('DD-MM-YYYY') + ".log"}`, {
//   interval: '1d',
//   compress: 'gzip',
//   path: logDir,
// })
// Access Log
// app.use(
//   morgan('combined', {
//     // stream: accessLogStream,
//   })
// )
app.use(morgan('combined'))

app.use((req, res, next) => {
  console.log(req.method, req.path, req.body)
  next()
})

const uptime = (req: any, res: any) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  try {
    // whatsappBotSender("Test Server started")

    return res.json(healthCheck)
  } catch (error) {
    healthCheck.message = `${error}`
    return res.json(healthCheck)
  }
}

app.get(`${environment.BASE_PATH}`, uptime);

app.get(`/`, uptime)


// app.use('/uploads', express.static(join(__dirname, '..', '/uploads')))
app.use(`${environment.BASE_PATH}/v1/`, ApiRouter)



const listener = app.listen(environment.PORT, environment.HOST, () => {
  if (listener != null) {
    const server = listener.address() as AddressInfo
    const endPoint = `${server.address}:${server.port}`
    console.log(`API Running on : ${endPoint + environment.BASE_PATH} `)
  }
})
