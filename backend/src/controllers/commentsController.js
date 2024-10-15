import {
  deleteCommentQuery,
  getAllCommentsQuery,
  insertCommentQuery,
  updateCommentQuery,
} from '../models/Comment.js'
import { getCommunityUserIdByToken } from '../models/CommunityUser.js'

export const createComment = async (req, res) => {
  try {
    const postId = req.params.postId
    const { content } = req.body
    const userId = req.user.id
    const communityUserId = await getCommunityUserIdByToken(userId)

    const newComment = await insertCommentQuery(
      communityUserId,
      content,
      postId,
    )
    return res.status(201).json(newComment)
  } catch (error) {
    res.status(400).json({
      error: 'Error from createComment controller',
      message: error.message,
    })
  }
}

export const displayAllComments = async (req, res) => {
  try {
    const postId = req.params.postId
    const allComments = await getAllCommentsQuery(postId)
    return res.status(200).json(allComments)
  } catch (error) {
    res.status(400).json({
      error: 'Error from displayAllComments controller',
      message: error.message,
    })
  }
}

export const updateComment = async (req, res) => {
  try {
    const postId = req.params.postId
    const commentId = req.params.commentId
    const { content } = req.body

    const updatedComment = await updateCommentQuery(commentId, content, postId)
    return res.status(200).json(updatedComment)
  } catch (error) {
    res.status(400).json({
      error: 'Error from updateComment controller',
      message: error.message,
    })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId
    const commentId = req.params.commentId

    await deleteCommentQuery(commentId, postId)
    return res
      .status(200)
      .json({
        message: `Comment id ${commentId} of post id ${postId} has been deleted.`,
      })
  } catch (error) {
    res.status(400).json({
      error: 'Error from deleteComment controller',
      message: error.message,
    })
  }
}
