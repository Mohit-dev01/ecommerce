import { Router } from "express";
import { categoryController } from "./category.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

// PUBLIC
router.get("/", categoryController.getCategories);

// ADMIN
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  categoryController.createCategory,
);

export default router;
