import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../prisma";
import "../../utils/extensions";
import { Stats } from "./types";

export const getStatsController = async (req: Request, res: Response) => {
    try {
        const result: Stats[] = await prisma.$queryRaw`
            SELECT
            (SELECT COUNT(b_id) FROM tbl_books tb WHERE editor_approved_by IS NOT NULL AND admin_approved_by IS NULL) AS admin_new_books,
            (SELECT COUNT(b_id) FROM tbl_books) AS books,
            (SELECT COUNT(u_id) FROM tbl_users WHERE role='Member') AS users
        `;
        if (result.length <= 0)
            return res.status(StatusCodes.NOT_FOUND).json([]);

        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
