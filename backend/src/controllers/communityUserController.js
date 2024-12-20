import {
  checkCommunityUserExistService,
  createNewCommunityUser,
} from '../services/communityUserService.js'

export const createCommunityUser = async (req, res) => {
  try {
    const { nickname } = req.body
    const userId = req.user.id

    // Ensure nickname is provided
    if (!nickname) {
      return res.status(400).json({
        errCode: 0,
        errMessage: 'Nickname is required',
      })
    }

    const userData = await createNewCommunityUser(userId, nickname)
    return res.status(201).json(userData)
  } catch (error) {
    res.status(400).json({
      error: 'Error from createCommunityUser controller',
      message: error.message,
    })
  }
}

export const checkCommunityUserExist = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await checkCommunityUserExistService(userId)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({
      error: 'Error from checkCommunityUserExist  controller',
      message: error.message,
    })
  }
}
