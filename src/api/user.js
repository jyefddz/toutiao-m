import request from '@/utils/request'

/**
 * 登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 请求用户自己的信息
 * @returns Promise
 */
export const getUserInfo = () => {
  // url methods headers
  return request({
    url: '/v1_0/user'
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const editUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 编辑用户照片资料
export const editUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
