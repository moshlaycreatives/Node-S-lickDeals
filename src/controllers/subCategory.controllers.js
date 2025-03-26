import { BadRequestException, NotFoundException } from "../errors/index.js";
import { MainCategory } from "../models/mainCategory.model.js";
import { SubCategory } from "../models/subCategory.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/* __________ CREATE SUB CATEGORY __________ */
export const addSubCategory = async (req, res) => {
  const { name, main_category_id } = req.body;

  if (!name || !main_category_id) {
    throw new BadRequestException(
      "Subcategory name and main category ID are required."
    );
  }

  const category = await MainCategory.findByPk(main_category_id);
  if (!category) {
    throw new NotFoundException("Main category not found.");
  }

  const subCategory = await SubCategory.create({ name, main_category_id });

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Subcategory created successfully.",
      data: subCategory,
    })
  );
};

/* __________ GET ALL SUB CATEGORIES __________ */
export const getAllSubCategories = async (req, res) => {
  const categories = await SubCategory.findAll({ include: MainCategory });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message:
        categories.length > 0
          ? "Subcategories retrieved successfully."
          : "Subcategories table is empty.",
      data: categories,
    })
  );
};

/* __________ GET SINGLE SUB CATEGORY __________ */
export const getSubCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await SubCategory.findByPk(id, { include: MainCategory });

  if (!category) {
    throw new NotFoundException("Subcategory not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Subcategory retrieved successfully.",
      data: category,
    })
  );
};

/* __________ UPDATE SUB CATEGORY __________ */
export const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const category = await SubCategory.findByPk(id);

  if (!category) {
    throw new NotFoundException("Subcategory not found.");
  }

  await category.update(req.body);

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Subcategory updated successfully.",
      data: category,
    })
  );
};

/* __________ DELETE SUB CATEGORY __________ */
export const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  const category = await SubCategory.findByPk(id);

  if (!category) {
    throw new NotFoundException("Subcategory not found.");
  }

  await category.destroy();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Subcategory deleted successfully.",
    })
  );
};
