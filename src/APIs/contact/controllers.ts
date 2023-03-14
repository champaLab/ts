import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getContactService, } from "./services";

export const getContactController = async (req: Request, res: Response) => {
    const contact = await getContactService()
    return res.status(StatusCodes.OK).json(contact)
}


