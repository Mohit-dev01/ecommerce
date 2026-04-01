import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";
import { sendSuccess } from "../../common/helpers/response";

export const categoryController = {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { createdAt: "desc" },
      });

      return sendSuccess(res, "Categories fetched", categories);
    } catch (e) {
      next(e);
    }
  },

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, slug } = req.body;

      const category = await prisma.category.create({
        data: { name, slug },
      });

      return sendSuccess(res, "Category created", category, 201);
    } catch (e) {
      next(e);
    }
  },
};
