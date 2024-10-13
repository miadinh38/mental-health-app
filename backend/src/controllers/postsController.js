import {
  deletePostQuery,
  getPostById,
  updatePostQuery,
} from '../models/Post.js'
import {
  createPostService,
  getAllPostsService,
} from '../services/postsService.js'

export const createPost = async (req, res) => {
  try {
    const userId = req.user.id
    const { content } = req.body
    const data = await createPostService(userId, content)

    return res.status(201).json(data)
  } catch (error) {
    res.status(400).json({
      error: 'Error from createPost controller',
      message: error.message,
    })
  }
}

export const displayAllPosts = async (req, res) => {
  try {
    const allPosts = await getAllPostsService()
    return res.status(200).json(allPosts)
  } catch (error) {
    res.status(400).json({
      error: 'Error from displayAllPosts controller',
      message: error.message,
    })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { content } = req.body
    const postId = req.params.id

    if (!content) {
      return res
        .status(400)
        .json({ error: 'Content is required for the update' })
    }

    const post = await getPostById(postId)
    if (post.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const updatedPost = await updatePostQuery(postId, content)
    return res.status(200).json(updatedPost)
  } catch (error) {
    res.status(400).json({
      error: 'Error from updatePosts controller',
      message: error.message,
    })
  }
}

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id

    const post = await getPostById(postId)

    if (post.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }

    await deletePostQuery(postId)
    return res.status(200).json({
      message: `Post id ${postId} has been deleted`,
    })
  } catch (error) {
    res.status(400).json({
      error: 'Error from deletePosts controller',
      message: error.message,
    })
  }
}
