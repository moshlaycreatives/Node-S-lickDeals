import { BadRequestException, NotFoundException } from "../errors/index.js";
import { Product } from "../models/product.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/* __________ CREATE PRODUCT __________ */
export const addProduct = async (req, res) => {
  console.log("");
  const images = req.files.map((file) => file.path.replace(/\\/g, "/"));

  if (!images.length) {
    throw new BadRequestException("At least one product image is required.");
  }

  const product = await Product.create({
    ...req.body,
    images,
  });

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Product created successfully.",
      data: product,
    })
  );
};

/* __________ GET ALL PRODUCTS __________ */
export const getAllProducts = async (req, res) => {
  const products = await Product.findAll();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message:
        products.length > 0
          ? "Products retrieved successfully."
          : "Products table is empty.",
      data: products,
    })
  );
};

/* __________ GET SINGLE PRODUCT __________ */
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundException("Product not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Product retrieved successfully.",
      data: product,
    })
  );
};

/* __________ UPDATE PRODUCT __________ */
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundException("Product not found.");
  }

  if (req.files.length > 0) {
    const images = req.files.length
      ? req.files.map((file) => file.path.replace(/\\/g, "/"))
      : product.images;

    await product.update({ ...req.body, images });
  } else {
    await product.update(req.body);
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Product updated successfully.",
      data: product,
    })
  );
};

/* __________ DELETE PRODUCT __________ */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundException("Product not found.");
  }

  await product.destroy();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Product deleted successfully.",
    })
  );
};
