import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createKhamkhomService, checkKhamkhomService, getKhamkhomService, getKhamkhomServiceByUserId, updateKhamkhomService, deleteKhamkhomService, randomKhamkhomService } from "./services";


export const createKhamkhomController = async (req: Request, res: Response) => {
    const check = await checkKhamkhomService(req.body.title)
    if (check) {
        return res.status(StatusCodes.OK).json({
            message: "ຄຳຄົມນີ້ ມີໃນລະບົບແລ້ວ",
            status: "error"
        })
    }

    await createKhamkhomService(req.body.title, req.body.created_by)
    return res.status(StatusCodes.OK).json({
        message: "ບັນທຶກສຳເລັດ",
        status: "success"
    })

}

export const getKhamkhomController = async (req: Request, res: Response) => {
    const _all = await getKhamkhomService()
    return res.status(StatusCodes.OK).json(_all)
}

export const getKhamkhomControllerByUserId = async (req: Request, res: Response) => {

    const id = Number(req.body.user.u_id)
    const role = req.body.user.role

    if (role === "Admin" || role === "SuperAdmin") {
        const _all = await getKhamkhomService()
        return res.status(StatusCodes.OK).json(_all)
    }

    const _all = await getKhamkhomServiceByUserId(id)
    return res.status(StatusCodes.OK).json(_all)
}

export const updateKhamkhomController = async (req: Request, res: Response) => {
    const id = Number(req.body.id)
    const title = req.body.title
    const _all = await updateKhamkhomService(id, title)
    if (!_all) {

        return res.status(StatusCodes.OK).json({
            message: "ຄຳຄົມນີ້ ບໍ່ສາມາອັບເດດໄດ້",
            status: "error"
        })
    }
    return res.status(StatusCodes.OK).json({
        message: "ອັບເດດຂໍ້ມູນສຳເລັດ",
        status: "success"
    })
}

export const deleteKhamkhomController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const _all = await deleteKhamkhomService(id)
    if (!_all) {
        return res.status(StatusCodes.OK).json({
            message: "ຄຳຄົມນີ້ ບໍ່ລົບໄດ້",
            status: "error"
        })
    }
    return res.status(StatusCodes.OK).json({
        message: "ລົບຂໍ້ມູນສຳເລັດ",
        status: "success"
    })
}

export const randomKhamkhomController = async (req: Request, res: Response) => {
    const khamkhom: any = await randomKhamkhomService()
    if (!khamkhom) {
        return res.status(StatusCodes.OK).json({
            message: "ຜິດພາດ ລອງອີກຄັ້ງ",
            status: "error"
        })
    }

    const max = khamkhom.length; // day of month
    const index = Math.floor(Math.random() * max)
    let khamkon = khamkhom[index].title

    return res.status(StatusCodes.OK).json({
        message: khamkon,
        status: "success"
    })
}

