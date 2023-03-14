import prisma from "../../../prisma"
import nodemailer from 'nodemailer'
import transporter from '../../../utils/mail-config'
const transport = nodemailer.createTransport(transporter)


export const userLoginService = async (email: string) => {
    try {
        const last_login = new Date()
        let user = await checkUserService(email)

        const id = user?.u_id
        if (user) {
            await prisma.$queryRaw`UPDATE tbl_users SET last_login = ${last_login} WHERE id = ${id}`
        }

        console.log("find use: ", user)
        if (!user) return null
        return user
    } catch (error) {
        console.error(error)
    }
}

export const generateCodeService = async (username: string) => {

    try {
        const created_at = new Date()
        const min = 100000;
        const max = 999999;
        const code = Math.floor(Math.random() * (max - min + 1)) + min;

        await prisma.tbl_verify_login.upsert({
            where: { username },
            create: { username, code, created_at },
            update: { code, created_at },


        })
        return code
    } catch (error) {
        console.error(error)
        return null
    }
}

export const userVerifyService = async (code: string, username: string) => {
    try {
        const rs = await prisma.$queryRaw`SELECT * FROM tbl_verify_login WHERE code = ${code} AND username = ${username}`;
        return rs
    } catch (error) {
        console.error(error)
        return null
    }
}

export const checkUserService = async (receive: string) => {
    try {
        let user = await prisma.tbl_users.findFirst({ where: { OR: [{ whatsapp: receive }, { email: receive }] } })
        console.log("check user: ", user)

        let check_user = false
        if (user) check_user = true
        return { ...user, check_user }
    } catch (error) {
        console.error(error)
        return { check_user: false }
    }
}

export const deleteCodeService = async (username: string) => {
    try {
        let user = await prisma.$queryRaw`DELETE  FROM tbl_verify_login WHERE username = ${username}`;
        return user
    } catch (error) {
        console.error(error)
        return null
    }
}

export const updateEmailService = async (u_id: number, email: string, updated_at: Date) => {
    try {
        let user = await prisma.tbl_users.update({
            where: { u_id },
            data: { email, updated_at }
        })
        return user
    } catch (error) {
        console.error(error)
        return null
    }
}

export const sendVerifyEmailService = async (email: string, pinCode: number) => {

    const html = `<div className="">
        <h1 style="text-align: center;">ຢືນຢັນການເຂົ້າສູ່ລະບົບ</h1>
        <div style="margin-bottom: .8rem; font-size: 1.3rem;">ສະບາຍດີ KOB DEV,</div>
        <div class=""> ການຮ້ອງຂໍເຂົ້າໃຊ້ງານລະບົບ ມົນພິທີດ້ວຍບັນຊີ ${email}. ເພື່ອສືບຕໍ່ການຮ້ອງຂໍນີ້,
            ກະລຸນາໃສ່ລະຫັດຂ້າງລຸ່ມນີ້ໃນຫນ້າການຢັ້ງຢັນຕົວຕົນ:</div>
        <div style="font-size: 2rem; font-weight: 800;margin-bottom: 1rem;">${pinCode}</div>
        <div class="">ຫາກບໍ່ແມ່ນທ່ານເຄື່ອນໄຫວ ກະລຸນາຢ່ານຳລະຫັດດັ່ງກ່າວໃຫ້ບຸກຄົນອື່ນ ເພື່ອຄວາມປອດໄພ. </div>
        <div style="margin-top: 1rem;">ດ້ວຍຄວາມນັບຖື,</div>
        <div class="">ສະຫນັບສະຫນູນໂດຍ ມົນພິທີ</div>
    </div>
        `
    const mailOption = {
        from: '"Monpity"<nopreply@monpity.la>',
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: html
    }
    try {
        const res = await transport.sendMail(mailOption)
        if (res) {
            console.log("<-------------------------------------------------------------------->\n")
            console.log(`> Mail verify is sent to      ------------->        ${email}`)
            console.log(res)
            console.log("\n<-------------------------------------------------------------------->\n")
        }
    } catch (error) {
        throw error
    }
}