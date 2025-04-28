import { Comment } from "../models/comments.model.js";
import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

// =============================================
// 1. Add New Comment
// =============================================
export const addNewComment = async (req, res) => {
  const { userId, productId, content } = req.body;

  const comment = await Comment.create({ userId, productId, content });
  res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Comment added successfully.",
      data: comment,
    })
  );
};

// =========================================================
// 2. Get All Comments For a Product Including User Details
// =========================================================
export const getAllComments = async (req, res) => {
  const { productId } = req.params;

  const comments = await Comment.findAll({
    where: { productId },
    include: {
      model: User,
      as: "user",
      attributes: ["id", "username", "email"],
    },
  });

  res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Comments fetched successfully.",
      data: comments,
    })
  );
};
