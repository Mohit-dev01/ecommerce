import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  // Admin user
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      passwordHash: password,
      role: "ADMIN",
    },
  });

  // Categories
  const electronics = await prisma.category.create({
    data: { name: "Electronics", slug: "electronics" },
  });

  const fashion = await prisma.category.create({
    data: { name: "Fashion", slug: "fashion" },
  });

  // Products
  await prisma.product.create({
    data: {
      name: "iPhone 14",
      slug: "iphone-14",
      description: "Latest iPhone",
      price: 80000,
      stock: 10,
      categoryId: electronics.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "T-Shirt",
      slug: "t-shirt",
      description: "Cotton T-shirt",
      price: 999,
      stock: 50,
      categoryId: fashion.id,
    },
  });
}

main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
