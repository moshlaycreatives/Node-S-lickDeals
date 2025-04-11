import { BadRequestException, NotFoundException } from "../errors/index.js";
import { MainCategory } from "../models/mainCategory.model.js";
import { SubCategory } from "../models/subCategory.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

// =============================================
// 1. Create Main Category
// =============================================
export const addMainCategory = async (req, res) => {
  if (!req.file) {
    throw new BadRequestException("Main category image is required.");
  }

  req.body.image = req.file.path.replace(/\\/g, "/");

  const category = await MainCategory.create(req.body);

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Main category created successfully.",
      data: category,
    })
  );
};

// =============================================
// 2. Get All Main Category
// =============================================
export const getAllMainCategories = async (req, res) => {
  const categories = await MainCategory.findAll({ include: SubCategory });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message:
        categories.length > 0
          ? "Main categories retrieved successfully."
          : "Main categories table is empty.",
      data: categories,
    })
  );
};

// =============================================
// 3. Get Main Category By Id
// =============================================
export const getMainCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await MainCategory.findByPk(id, { include: SubCategory });

  if (!category) {
    throw new NotFoundException("Main category not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Main category retrieved successfully.",
      data: category,
    })
  );
};

// =============================================
// 4. Update Main Category
// =============================================
export const updateMainCategory = async (req, res) => {
  const { id } = req.params;

  const category = await MainCategory.findByPk(id);

  if (!category) {
    throw new NotFoundException("Main category not found.");
  }

  if (req.file) {
    req.body.image = req.file.path.replace(/\\/g, "/");
  }

  await category.update(req.body);

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Main category updated successfully.",
      data: category,
    })
  );
};

// =============================================
// 5. Delete Main Category
// =============================================
export const deleteMainCategory = async (req, res) => {
  const { id } = req.params;
  const category = await MainCategory.findByPk(id);

  if (!category) {
    throw new NotFoundException("Main category not found.");
  }

  await category.destroy();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Main category deleted successfully.",
    })
  );
};
