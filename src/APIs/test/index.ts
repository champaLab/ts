

import { Router } from 'express'
import prisma from '../../prisma';


const router = Router()

router.get('/a', async (req: any, res: any) => {
    let p = await prisma.tbl_cities.findMany({})
    return res.json(p)
})


export default router
