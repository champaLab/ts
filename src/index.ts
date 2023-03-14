import express from 'express'
const app = express()

app.get('/', function (req: any, res: any) {
    res.send('Hello World')
})

const port = 3000
app.listen(port, () => {
    console.log("server listening on port " + port)
})