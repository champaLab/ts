import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createFestivalService, getFestivalService, removeFestivalService } from "./services";

export const getFestivalController = async (req: Request, res: Response) => {
    const festival = await getFestivalService()
    return res.status(StatusCodes.OK).json(festival)
}

export const createFestivalController = async (req: Request, res: Response) => {
    const festival = await createFestivalService(req.body)
    return res.status(StatusCodes.OK).json(festival)
}

export const removeFestivalController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" })
    }

    const festival = await removeFestivalService(id)
    return res.status(StatusCodes.OK).json(festival)
}


