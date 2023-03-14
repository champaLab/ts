"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserStatusCtrl = exports.updateUserProfile = exports.updateUserController = exports.getUsersController = exports.userCreateController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const monpity_crypt_1 = require("../../utils/monpity-crypt");
const userCreateController = async (req, res) => {
    const payload = req.body.user;
    let { password } = req.body;
    const user = {
        name: req.body.name,
        role: req.body.role,
        password: (0, monpity_crypt_1.encrypt)(req.body.password),
        email: req.body.email,
        created_at: req.body.created_at
    };
    if (payload.role === "Admin" || payload.role === "SuperAdmin") {
        // const result = await userCreateService(user);
        // return res.status(StatusCodes.OK).json(result);
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການເພີ່ມຂໍ້ມູນຜູ້ໃຊ້",
        });
    }
};
exports.userCreateController = userCreateController;
const getUsersController = async (req, res) => {
    const result = await (0, services_1.getUsersService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.getUsersController = getUsersController;
const updateUserController = async (req, res) => {
    const payload = req.body.user;
    const u_id = Number(req.body.u_id);
    const name = req.body.name;
    const role = req.body.role;
    const email = req.body.email;
    const updated_at = req.body.updated_at;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;
    let user = { u_id, name, role, email, updated_at };
    console.log("password ", password);
    if (password && password !== confirm_password) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
        });
    }
    // @ts-ignore
    if (password)
        user = { u_id, name, role, email, updated_at, password: (0, monpity_crypt_1.encrypt)(password) };
    if (payload.role === "Admin" || payload.role === "SuperAdmin") {
        const result = await (0, services_1.updateUserService)(user);
        if (!result)
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "error",
                message: "ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ",
            });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "success",
            message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້",
        });
    }
};
exports.updateUserController = updateUserController;
const updateUserProfile = async (req, res) => {
    if (!req.body.username)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້",
        });
    const result = await (0, services_1.updateUserProfileService)(req.body);
    if (!result)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ",
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
    });
};
exports.updateUserProfile = updateUserProfile;
const updateUserStatusCtrl = async (req, res) => {
    let status = req.body.status;
    const updated_at = req.body.updated_at;
    const user = req.body.user;
    const u_id = Number(req.params.u_id);
    console.log("=============== change status =================");
    console.log("12345678 ", req.body);
    if (status === "Off") {
        status = "On";
    }
    else {
        status = "Off";
    }
    if (user.role === "Admin" || user.role === "SuperAdmin") {
        const result = await (0, services_1.updateUserStatus)(u_id, status, updated_at);
        if (!result)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                status: "error",
                message: "ແກ້ໄຂສະຖານະບໍ່ສຳເລັດ",
            });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "success",
            message: "ອັບເດດ ສະຖານະສຳເລັດ",
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການແກ້ໄຂສະຖານະຜູ້ໃຊ້",
        });
    }
};
exports.updateUserStatusCtrl = updateUserStatusCtrl;
const deleteUserController = async (req, res) => {
    const payload = req.body.user;
    const id = Number(req.params.u_id);
    console.log(id);
    if (payload.role === "Admin" || payload.role === "SuperAdmin") {
        const result = await (0, services_1.deleteUserService)(id);
        if (!result)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                status: "error",
                message: "ບໍ່ສາມາດລົບ ຂໍ້ມູນຜູ້ໃຊ້ງານໄດ້",
            });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "success",
            message: "ລົບ ຂໍ້ມູນຜູ້ໃຊ້ງານໄດ້ ສຳເລັດແລ້ວ",
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
            message: "ທ່ານບໍ່ໄດ້ຮັບສິດໃນການແກ້ໄຂລະຫັດຜ່ານຜູ້ໃຊ້",
        });
    }
};
exports.deleteUserController = deleteUserController;
