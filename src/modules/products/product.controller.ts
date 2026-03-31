import { Request, Response, NextFunction } from "express";
import { productService } from "./product.service";
import { sendSuccess } from "../../common/helpers/response";

export const productController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProducts(req.query);

      return sendSuccess(res, "Products fetched", products);
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductBySlug(
        req.params.slug as string,
      );

      return sendSuccess(res, "Product fetched", product);
    } catch (error) {
      next(error);
    }
  },
};
