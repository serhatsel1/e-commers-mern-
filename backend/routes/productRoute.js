import express from "express";

import * as productController from "../controllers/productController.js";

const router = express.Router();

router.get("/products", productController.allProducts);
router.get("/admin/products", productController.adminProducts);
router.get("/products/:id", productController.detailProduct);
router.post("/product/new", productController.createProduct);
router.post("/product/newReview", productController.createReview);
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:id", productController.updateProduct);

export default router;
