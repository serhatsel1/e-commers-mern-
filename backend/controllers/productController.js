import Product from "../model/productModel.js";
import ProductFilter from "../utils/ProductFilter.js";
import { v2 as cloudinary } from "cloudinary";

const allProducts = async (req, res) => {
  const resultPerPage = 10;
  const productFilter = new ProductFilter(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await productFilter.query;

  res.status(200).json({
    products,
  });
};

const detailProduct = async (req, res) => {
  const productId = req.params.id;

  const product = Product.findById(productId);

  res.status(200).json({
    product,
  });
};

//!admin
const createProduct = async (req, res) => {
  let images = [];
  if (req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let allImage = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const inputProduct = req.body;

  const product = await Product.create(inputProduct);

  res.status(201).json({
    product,
  });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  product.remove();

  res.status(200).json({
    message: "Ürün başarıyla silindi...",
  });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  product = await Product.findByIdAndUpdate(productId, req.body, { new: true });

  req.status(200).json({
    product,
  });
};

export {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
