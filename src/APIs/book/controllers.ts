import { updateBookService, createBookService, removeBookService, getBookByTypeBookService, editorGetNewBookService, getMyBookService, editorApproveBookService, adminApproveBookService, adminGetNewBookService, getBookSearchService, } from './services';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const editorGetNewBookController = async (req: Request, res: Response) => {
    const user = req.body.user
    const book = await editorGetNewBookService(user)
    return res.status(StatusCodes.OK).json(book)
}

export const adminGetNewBookController = async (req: Request, res: Response) => {
    const book = await adminGetNewBookService()
    return res.status(StatusCodes.OK).json(book)
}

export const editorApproveBookController = async (req: Request, res: Response) => {
    const book = await editorApproveBookService(req.body)
    return res.status(StatusCodes.OK).json(book)
}

export const adminApproveBookController = async (req: Request, res: Response) => {
    const book = await adminApproveBookService(req.body)
    return res.status(StatusCodes.OK).json(book)
}

export const getMyBookController = async (req: Request, res: Response) => {
    const user = req.body.user
    const book = await getMyBookService(user)
    return res.status(StatusCodes.OK).json(book)
}


export const updateBookController = async (req: Request, res: Response) => {
    const book = await updateBookService(req.body)
    return res.status(StatusCodes.OK).json(book)
}

export const createBookController = async (req: Request, res: Response) => {

    const book = await createBookService(req.body)
    return res.status(StatusCodes.OK).json(book)
}

export const removeBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" })
    }
    const Book = await removeBookService(Number(id))
    return res.status(StatusCodes.OK).json(Book)
}

export const getBookByBookTypeController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id || typeof id !== 'number') {
        return res.status(StatusCodes.OK).json({ message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" })
    }
    const Book = await getBookByTypeBookService(id)
    return res.status(StatusCodes.OK).json(Book)
}

export const getBookSearchController = async (req: Request, res: Response) => {
    const key = req.body.key
    const column = `${req.body.column}`.trim()
    const Book = await getBookSearchService(key, column)
    return res.status(StatusCodes.OK).json(Book)
}


