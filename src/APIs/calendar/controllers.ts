import { createCalendarService, getCalendarService, getDataForAddCalendarService, removeCalendarService, } from './services';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getCalendarController = async (req: Request, res: Response) => {
    const Calendar = await getCalendarService()
    return res.status(StatusCodes.OK).json(Calendar)
}

export const createCalendarController = async (req: Request, res: Response) => {
    const Calendar = await createCalendarService(req.body)
    return res.status(StatusCodes.OK).json(Calendar)
}
export const removeCalendarController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    console.log(id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" })
    }
    const Calendar = await removeCalendarService(id)
    return res.status(StatusCodes.OK).json(Calendar)
}

export const getDataForAddCalendarController = async (req: Request, res: Response) => {
    const Calendar = await getDataForAddCalendarService()
    return res.status(StatusCodes.OK).json(Calendar)
}


