import { ITokenPayload, TypeRequestQuery } from './../../types/index';
import { createBookTypesService, getBookTypesService, removeBookTypesService } from './services';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



export const getBookTypeController = async (req: TypeRequestQuery<ITokenPayload>, res: Response) => {
    const book = await getBookTypesService()
    return res.status(StatusCodes.OK).json(book)
}

export const createBookTypeController = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.json({ status: "error", message: "ກະລຸນາອັບໂຫຼດ ໄອຄອນ" })
    }
    const book = await createBookTypesService(req.body, req.file.path)
    return res.status(StatusCodes.OK).json(book)
}

export const removeBookTypeController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" })
    }
    const book = await removeBookTypesService(Number(id))
    return res.status(StatusCodes.OK).json(book)
}