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

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.createProduct(req.body);
      return sendSuccess(res, "Product created", product, 201);
    } catch (e) {
      next(e);
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.updateProduct(
        req.params.id as string,
        req.body,
      );
      return sendSuccess(res, "Product updated", product);
    } catch (e) {
      next(e);
    }
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.deleteProduct(req.params.id as string);
      return sendSuccess(res, "Product deleted", null);
    } catch (e) {
      next(e);
    }
  },
};
