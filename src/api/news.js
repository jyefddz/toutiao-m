import request from '@/utils/request'

/**
 * 获取频道的文章
 * @param {*} channelId 频道的id
 * @param {*} timestamp 获取第一页的文章的时间戳
 * @returns Promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
