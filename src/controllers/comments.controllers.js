import { Comment } from "../models/comments.model.js";
import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/* __________ ADD NEW COMMENT __________ */
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

/* __________ Get ALL COMMENTS FOR A PRODUCT INCLUDING USER DETAILS __________ */
export const getAllComments = async (req, res) => {
  const { productId } = req.params;

  const comments = await Comment.findAll({
    where: { productId },
    include: {
      model: User,
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
