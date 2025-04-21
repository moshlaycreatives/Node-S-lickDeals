import { BadRequestException, NotFoundException } from "../errors/index.js";
import { Favorite } from "../models/favorite.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

// ==============================================
// 1. Add to Favorites
// ==============================================
export const favoriteProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;

  const product = await Product.findByPk(productId);
  if (!product) {
    throw new NotFoundException("Product not found.");
  }

  const existingFavorite = await Favorite.findOne({
    where: { userId, productId },
  });

  if (existingFavorite) {
    throw new BadRequestException("Product already in favorites.");
  }

  const favorite = await Favorite.create({
    userId,
    productId,
  });

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Product added to favorites successfully.",
      data: favorite,
    })
  );
};

// ==============================================
// 2. Remove from Favorites
// ==============================================
export const unfavoriteProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;

  const favorite = await Favorite.findOne({
    where: { userId, productId },
  });

  if (!favorite) {
    throw new NotFoundException("Favorite not found.");
  }

  await favorite.destroy();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Product removed from favorites successfully.",
    })
  );
};

// ==============================================
// 3. Get User's Favorites
// ==============================================
export const getUserFavorites = async (req, res) => {
  const userId = req.userId;

  const favorites = await Favorite.findAll({
    where: { userId },
    include: [
      {
        model: Product,
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
      },
    ],
  });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message:
        favorites.length > 0
          ? "Favorites retrieved successfully."
          : "No favorites found.",
      data: favorites,
    })
  );
};
