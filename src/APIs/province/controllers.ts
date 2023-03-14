import { updateProvinceService, createProvinceService, getProvinceService, removeProvinceService } from './services';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getProvinceController = async (req: Request, res: Response) => {
    const Province = await getProvinceService()
    return res.status(StatusCodes.OK).json(Province)
}

export const updateProvinceController = async (req: Request, res: Response) => {
    const Province = await updateProvinceService(req.body)
    return res.status(StatusCodes.OK).json(Province)
}

export const createProvinceController = async (req: Request, res: Response) => {
    const Province = await createProvinceService(req.body)
    return res.status(StatusCodes.OK).json(Province)
}
export const removeProvinceController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" })
    }
    const Province = await removeProvinceService(Number(id))
    return res.status(StatusCodes.OK).json(Province)
}


