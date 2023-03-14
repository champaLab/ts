import { updateCityService, createCityService, getCityByProIdService, getCityService, removeCityService } from './services';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getCityController = async (req: Request, res: Response) => {
    const City = await getCityService()
    return res.status(StatusCodes.OK).json(City)
}

export const getCityByProIdController = async (req: Request, res: Response) => {
    const pro_id = req.body.province_id;
    const City = await getCityByProIdService(pro_id)
    return res.status(StatusCodes.OK).json(City)
}

export const updateCityController = async (req: Request, res: Response) => {
    const City = await updateCityService(req.body)
    return res.status(StatusCodes.OK).json(City)
}

export const createCityController = async (req: Request, res: Response) => {
    const City = await createCityService(req.body)
    return res.status(StatusCodes.OK).json(City)
}

export const removeCityController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" })
    }
    const City = await removeCityService(Number(id))
    return res.status(StatusCodes.OK).json(City)
}


