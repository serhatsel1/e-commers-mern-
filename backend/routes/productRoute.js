import express from "express";

import * as productController from "../controllers/productController.js";
import { authenticatedmid, roleChecked } from "../middleware/auth.js";

const router = express.Router();

router.get("/products", productController.allProducts);
router.get("/admin/products",authenticatedmid,roleChecked("admin"), productController.adminProducts);
router.get("/products/:id", productController.detailProduct);
router.post("/product/new",authenticatedmid,roleChecked("admin"), productController.createProduct);
router.post("/product/newReview",authenticatedmid, productController.createReview);
router.delete("/products/:id",authenticatedmid,roleChecked("admin"), productController.deleteProduct);
router.put("/products/:id",authenticatedmid,roleChecked("admin"), productController.updateProduct);

export default router;
