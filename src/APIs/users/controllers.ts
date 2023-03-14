import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    userCreateService,
    getUsersService,
    updateUserService,
    updateUserStatus,
    deleteUserService,
    updateUserProfileService,
    userVerifyService,
    deleteCodeService,
    sendVerifyEmailService,
} from "./services";
import { encrypt } from "../../utils/monpity-crypt";
import { checkUserService, generateCodeService } from "../auths/services";
import { whatsappBotVerifySender } from "../../utils/whatsapp-bot";
import { sign } from "../../utils/jwt";

export const userCreateController = async (req: Request, res: Response) => {
    const payload = req.body.user;
    let { password } = req.body;

    const user = {
        name: req.body.name,
        role: req.body.role,
        password: encrypt(req.body.password),
        email: req.body.email,
        created_at: req.body.created_at
    };

    if (payload.role === "Admin" || payload.role === "SuperAdmin") {
        // const result = await userCreateService(user);

        // return res.status(StatusCodes.OK).json(result);

    } else {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການເພີ່ມຂໍ້ມູນຜູ້ໃຊ້",
        });
    }
};

export const getUsersController = async (req: Request, res: Response) => {
    const result = await getUsersService();
    return res.status(StatusCodes.OK).json(result);
};

export const updateUserController = async (
    req: Request,
    res: Response
) => {
    const payload = req.body.user;

    const u_id = Number(req.body.u_id)
    const name = req.body.name
    const role = req.body.role
    const email = req.body.email
    const updated_at = req.body.updated_at
    let password = req.body.password
    let confirm_password = req.body.confirm_password

    let user = { u_id, name, role, email, updated_at }

    console.log("password ", password)

    if (password && password !== confirm_password) {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
        });
    }
    // @ts-ignore
    if (password) user = { u_id, name, role, email, updated_at, password: encrypt(password) }



    if (payload.role === "Admin" || payload.role === "SuperAdmin") {
        const result = await updateUserService(user);
        if (!result)
            return res.status(StatusCodes.OK).json({
                status: "error",
                message: "ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ",
            });
        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
        });
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້",
        });
    }
};

export const updateUserProfile = async (req: Request | any, res: Response) => {

    if (!req.body.username)
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້",
        });

    const result = await updateUserProfileService(req.body);
    if (!result)
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ",
        });
    return res.status(StatusCodes.OK).json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
    });
};

export const updateUserStatusCtrl = async (
    req: Request,
    res: Response
) => {

    let status = req.body.status;
    const updated_at = req.body.updated_at;
    const user = req.body.user;
    const u_id = Number(req.params.u_id);

    console.log("=============== change status =================")
    console.log("12345678 ", req.body)
    if (status === "Off") {
        status = "On"
    } else {
        status = "Off"
    }




    if (user.role === "Admin" || user.role === "SuperAdmin") {
        const result = await updateUserStatus(u_id, status, updated_at);
        if (!result)
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                message: "ແກ້ໄຂສະຖານະບໍ່ສຳເລັດ",
            });
        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "ອັບເດດ ສະຖານະສຳເລັດ",
        });
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການແກ້ໄຂສະຖານະຜູ້ໃຊ້",
        });
    }
};

export const deleteUserController = async (
    req: Request,
    res: Response
) => {
    const payload = req.body.user;
    const id = Number(req.params.u_id);
    console.log(id)
    if (payload.role === "Admin" || payload.role === "SuperAdmin") {
        const result = await deleteUserService(id);
        if (!result)
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                message: "ບໍ່ສາມາດລົບ ຂໍ້ມູນຜູ້ໃຊ້ງານໄດ້",
            });
        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "ລົບ ຂໍ້ມູນຜູ້ໃຊ້ງານໄດ້ ສຳເລັດແລ້ວ",
        });
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການແກ້ໄຂລະຫັດຜ່ານຜູ້ໃຊ້",
        });
    }
};


export const userVerifyController = async (req: Request, res: Response) => {
    try {
        const code = req.body.key;
        const receive = req.body.receive;

        const check: any = await userVerifyService(code, receive);
        if (!check || check.length === 0) {
            return res.status(StatusCodes.OK).json({ message: "ລະຫັດບໍ່ຖືກຕ້ອງ", status: "error" })
        }

        const user = await checkUserService(receive)
        deleteCodeService(receive)

        if (!user.name) {
            return res.status(StatusCodes.OK).json({ message: "ຂໍ້ມູນຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ", status: "error" })
        }

        console.log('userVerifyController ', user)
        if (user && user.status !== 'On') {
            return res.status(StatusCodes.OK).json({ message: "ບັນຊີຂອງທ່ານ ຖືກລະງັບການໃຊ້ງານ ຊົ່ວຄາວ", status: "error" })
        }

        const _user = {
            name: user.name,
            u_id: user.u_id,
            email: user.email,
            whatsapp: user.whatsapp,
            role: user.role,
        }

        let response = {
            status: "success",
            user: _user,
            token: '',
        };

        const token = await sign(_user);
        response = { ...response, token, status: "success" }

        console.log(response)
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


// 

export const userLoginController = async (req: Request, res: Response) => {
    let username: string = req.body["username"];
    const loginBy: string = req.body["loginBy"];


    try {
        const user = await checkUserService(username);
        if (!user) {
            return res.status(StatusCodes.OK).json({ message: "ຂໍ້ມູນຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ", status: "error" })
        }

        const code = await generateCodeService(username);
        if (!code) {
            return res.status(StatusCodes.OK).json({ message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
        }

        if (loginBy === "whatsapp") {
            const whatsapp = user?.whatsapp || ''
            whatsappBotVerifySender(whatsapp, code)
        } else if (loginBy === "email") {
            // TODO: Call function sens mail
            sendVerifyEmailService(username, code)
        } else {
            return res.status(StatusCodes.OK).json({ status: "error", message: "ຮູບແບບການເຂົ້າສູ່ລະບົບບໍ່ຖືກຕ້ອງ" });
        }


        return res.status(StatusCodes.OK).json({ status: "success" })

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

// export const userUpdateEmailController = async (req: Request, res: Response) => {

//     const u_id = req.body.u_id
//     const email = req.body.email
//     const created_at = req.body.created_at


//     const result: any = await checkUserService(email);
//     console.log("7777 ", result)
//     if (result.check_user) {
//         return res.status(StatusCodes.OK).json({
//             status: "error",
//             message: "Email ມີໃນລະບົບແລ້ວ ກະລຸນາໃຊ້ເມວອື່ນ",
//         });
//     }

//     const user: any = await updateEmailService(
//         u_id,
//         email,
//         created_at,
//     )

//     console.log(user)

//     if (!user) {
//         return res.status(StatusCodes.OK).json({
//             status: "error",
//             message: "ອັບເດດ Email ຜິດພາດ",
//         });
//     }

//     const code = await generateCodeService(email);
//     if (!code) {
//         return res.status(StatusCodes.OK).json({ message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
//     }

//     try {
//         // TODO: call function to send email
//     } catch (error) {
//         console.log("send whatsapp error ", error)
//     }

//     return res.status(StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
// };

// export const userRegisterController = async (req: Request, res: Response) => {

//     const name = req.body.name
//     const whatsapp = req.body.whatsapp
//     const email = req.body.email
//     const role = "Member"
//     const created_at = req.body.created_at

//     const resultW: any = await checkUserService(whatsapp);

//     if (resultW.check_user) {
//         return res.status(StatusCodes.OK).json({
//             status: "error",
//             message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
//         });
//     }

//     const resultE: any = await checkUserService(email);

//     if (resultE.check_user) {
//         return res.status(StatusCodes.OK).json({
//             status: "error",
//             message: "Email ນີ້ມີໃນລະບົບແລ້ວ",
//         });
//     }

//     const user: any = await userCreateService({
//         name,
//         whatsapp: whatsapp,
//         role,
//         email,
//         created_at,
//         last_login: created_at
//     })

//     if (!user) {
//         return res.status(StatusCodes.OK).json({
//             status: "error",
//             message: "ການລົງທະບຽນຜິດພາດ",
//         });
//     }

//     const code = await generateCodeService(whatsapp);
//     if (!code) {
//         return res.status(StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
//     }

//     try {
//         whatsappBotVerifySender(whatsapp, code)
//     } catch (error) {
//         console.log("send whatsapp error ", error)
//     }

//     return res.status(StatusCodes.OK).json({ status: "success", message: " " });
// };

// export const userResendCodeEmailController = async (req: Request, res: Response) => {

//     const email = req.body.email
//     console.log(email)

//     const code = await generateCodeService(email);
//     if (!code) {
//         return res.status(StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
//     }

//     try {
//         await sendVerifyEmailService(email, code)
//         return
//     } catch (error) {
//         console.log("send email error ", error)
//         return
//     }

//     return res.status(StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
// };

// export const userResendCodeWhatsappController = async (req: Request, res: Response) => {

//     const whatsapp = req.body.whatsapp

//     const code = await generateCodeService(whatsapp);
//     if (!code) {
//         return res.status(StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
//     }

//     try {
//         whatsappBotVerifySender(whatsapp, code)
//     } catch (error) {
//         console.log("send whatsapp error ", error)
//     }

//     return res.status(StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
// };

// export const getMeController = async (req: Request, res: Response) => {

//     let user = req.body.user
//     console.log('========================= USER REFRESH =======================================')
//     console.log(user)

//     return res.status(StatusCodes.OK).json({ status: "success", user });
// };
