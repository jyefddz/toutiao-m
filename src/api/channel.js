import request from '@/utils/request'

/**
 * 获取我的频道列表
 * @returns Promise
 */
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道列表
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
