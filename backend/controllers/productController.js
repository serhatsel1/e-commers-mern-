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

const adminProducts = async (req, res, next) => {
  const products = await Product.find();

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
const createProduct = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
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

    req.body.images = allImage;
    req.body.user = req.user.id;
  }
  const inputProduct = req.body;

  const product = await Product.create(inputProduct);

  res.status(201).json({
    product,
  });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.upload(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    message: "Ürün başarıyla silindi...",
  });
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }
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

    req.body.images = allImage;
  }
  const inputProduct = req.body;

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  req.status(200).json({
    product,
  });
};

const createReview = async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment: comment,
    rating: Number(rating),
  };
  const product = await Product.findById(productId);

  let avg = 0;

  product.reviews.push(review);

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.reviews.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "Yorumun başarıyla eklendi...",
  });
};
export {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
};
