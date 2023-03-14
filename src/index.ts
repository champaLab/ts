import express from 'express'
import prisma from './prisma'
const app = express()

app.get('/', async (req: any, res: any) => {

    let pro = await prisma.tbl_provinces.findMany()
    return res.send(pro)
})

app.get('/a', async (req: any, res: any) => {

    let pro = await prisma.tbl_provinces.findMany()
    return res.send(pro)
})

const port = 3000
app.listen(port, () => {
    console.log("server listening on port " + port)
})