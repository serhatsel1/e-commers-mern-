import Product from "../model/productModel.js";

const allProducts = async (req, res) => {
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
const createProduct = async (req, res) => {
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
