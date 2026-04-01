import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes";
import { notFound } from "./middleware/not-found.middleware";
import { errorHandler } from "./middleware/error.middleware";
import productRoutes from "./modules/products/product.route";
import categoryRoutes from "./modules/categories/category.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
