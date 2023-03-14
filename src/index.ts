import express from 'express'
import cors from 'cors'
// import fs from 'fs-extra'
import bodyParser from 'body-parser'
import environment from './utils/environment'
import { AddressInfo } from 'net'
import ApiRouter from './APIs'

// import { createStream } from 'rotating-file-stream'
import morgan from 'morgan'
// import dayjs from 'dayjs'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


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
        return res.json(healthCheck)
    } catch (error) {
        healthCheck.message = `${error}`
        return res.json(healthCheck)
    }
}

app.get(`${environment.BASE_PATH}`, uptime);

app.get(`/`, uptime)

app.use(`${environment.BASE_PATH}`, ApiRouter)

const listener = app.listen(environment.PORT, environment.HOST, () => {
    if (listener != null) {
        const server = listener.address() as AddressInfo
        const endPoint = `${server.address}:${server.port}`
        console.log(`API Running on : ${endPoint + environment.BASE_PATH}`)
        console.log("BASE_PATH ", environment.BASE_PATH)
    }
})
