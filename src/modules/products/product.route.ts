import { Router } from "express";
import { productController } from "./product.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

// PUBLIC
router.get("/", productController.getProducts);
router.get("/:slug", productController.getProduct);

// ADMIN
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  productController.createProduct,
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.deleteProduct,
);
export default router;
