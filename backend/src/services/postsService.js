import { getCommunityUserIdByToken } from '../models/CommunityUser.js'
import { getAllPosts, insertPost } from '../models/Post.js'

export const createPostService = async (userId, content) => {
  try {
    const communityUserId = await getCommunityUserIdByToken(userId)
    const newPost = await insertPost(communityUserId, content)
    return newPost
  } catch (error) {
    console.error('Error from createPostService: ', error)
    throw error
  }
}

export const getAllPostsService = async () => {
  try {
    const allPost = await getAllPosts()
    return allPost
  } catch (error) {
    console.error('Error from getAllPostsService: ', error)
    throw error
  }
}
