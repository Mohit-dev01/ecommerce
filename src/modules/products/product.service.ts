import slugify from "slugify";
import { AppError } from "../../common/errors/app-error";
import { productRepository } from "./product.repository";
import { prisma } from "../../lib/prisma";

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

  async createProduct(data: any) {
    //  Validate category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError("Invalid category", 400);
    }

    const slug = slugify(data.name, { lower: true });

    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        slug,

        //  RELATION (best practice)
        category: {
          connect: { id: data.categoryId },
        },
      },
    });
  },

  async updateProduct(id: string, data: any) {
    return productRepository.update(id, data);
  },

  async deleteProduct(id: string) {
    return productRepository.delete(id);
  },
};
