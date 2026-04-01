import { prisma } from "../../lib/prisma";

export const productRepository = {
  findMany(filters: { search?: string; category?: string }) {
    return prisma.product.findMany({
      where: {
        isPublished: true,

        name: filters.search
          ? { contains: filters.search, mode: "insensitive" }
          : undefined,

        category: filters.category ? { slug: filters.category } : undefined,
      },

      include: {
        images: true,
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        category: true,
      },
    });
  },

  create(data: any) {
    return prisma.product.create({
      data,
    });
  },

  update(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  },
};
