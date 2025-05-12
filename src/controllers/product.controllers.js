import { BadRequestException, NotFoundException } from "../errors/index.js";
import { Product } from "../models/product.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";
import { SubCategory } from "../models/subCategory.model.js";
import { MainCategory } from "../models/mainCategory.model.js";

// ==============================================
// 1. Add Product
// ==============================================
export const addProduct = async (req, res) => {
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

// ==============================================
// 2. Get All Products
// ==============================================
export const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: SubCategory,
        attributes: ["name"],
        include: [
          {
            model: MainCategory,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

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

// ==============================================
// 3. Get All Top Products
// ==============================================
export const searchProducts = async (req, res) => {
  const { query } = req.query;

  const lowerQuery = query.toLowerCase();

  const searchQuery = query
    ? {
        include: [
          {
            model: SubCategory,
            attributes: ["name"],
            include: [
              {
                model: MainCategory,
                attributes: ["name"],
              },
            ],
          },
        ],
      }
    : {
        where: { deals: "Top" },
        include: [
          {
            model: SubCategory,
            attributes: ["name"],
            include: [
              {
                model: MainCategory,
                attributes: ["name"],
              },
            ],
          },
        ],
      };

  const products = await Product.findAll(searchQuery);

  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const subCategoryName = product.SubCategory?.name?.toLowerCase() || "";
    const mainCategoryName =
      product.SubCategory?.MainCategory?.name?.toLowerCase() || "";

    return (
      productName.includes(lowerQuery) ||
      subCategoryName.includes(lowerQuery) ||
      mainCategoryName.includes(lowerQuery)
    );
  });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message:
        filteredProducts.length > 0
          ? "Matching products retrieved successfully."
          : "No matching products found.",
      data: filteredProducts,
    })
  );
};

// ==============================================
// 4. Get All Products By Sub Category Id
// ==============================================
export const getAllProductsBySubCategoryId = async (req, res) => {
  const { id } = req.params;
  const products = await Product.findAll({ where: { sub_category_id: id } });

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

// ==============================================
// 5. Get All Products By Main Category Id
// ==============================================
export const getAllProductsByMainCategoryId = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findAll({
      include: {
        model: SubCategory,
        where: {
          main_category_id: id,
        },
        include: {
          model: MainCategory,
        },
      },
    });

    return res.status(200).json(
      new ApiResponce({
        statusCode: 200,
        message:
          products.length > 0
            ? "Products retrieved successfully."
            : "No products found for this main category.",
        data: products,
      })
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponce({
        statusCode: 500,
        message: "An error occurred while retrieving products.",
        error: error.message,
      })
    );
  }
};

// =============================================
// 6. Get Product By Id
// =============================================
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

// =============================================
// 7. Update Product
// =============================================
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

// =============================================
// 8. Delete Product
// =============================================
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
