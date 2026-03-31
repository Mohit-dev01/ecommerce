import { AppError } from "../../common/errors/app-error";
import { productRepository } from "./product.repository";

export const productService = {
  async getProducts(query: any) {
    return productRepository.findMany({
      search: query.search,
      category: query.category,
    });
  },

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);

    if (!product || !product.isPublished) {
      throw new AppError("Product not found", 404);
    }

    return product;
  },
};
