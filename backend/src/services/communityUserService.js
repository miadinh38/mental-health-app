import {
  checkNicknameExists,
  getUserByNickname,
  insertNickname,
  updateAgreementSigned,
} from '../models/CommunityUser.js'

export const createNewCommunityUser = async (userId, nickname) => {
  try {
    // Check if the user join community before
    const communityUser = await checkNicknameExists(userId)
    if (communityUser.length > 0) {
      return {
        errCode: 1,
        errMessage: "You've joined the community and had a nickname.",
      }
    }

    // Check if the nickname is unquie
    const isNicknameExist = await getUserByNickname(nickname)
    if (isNicknameExist.length > 0) {
      return {
        errCode: 1,
        errMessage: 'This nickname has been taken. Please select another one.',
      }
    }

    await insertNickname(userId, nickname)
    const result = await updateAgreementSigned(userId)
    return {
      errCode: 0,
      errMessage: 'Nickname created. Welcome to TeenVent Community!',
      result,
    }
  } catch (error) {
    console.error('Error from createNewCommunityUser service: ', error)
    throw error
  }
}

export const checkCommunityUserExistService = async (userId) => {
  try {
    const communityUser = await checkNicknameExists(userId)
    if (communityUser.length > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error from checkCommunityUserExistService service: ', error)
    throw error
  }
}
