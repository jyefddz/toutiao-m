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

/**
 * 获取文章详情
 * @param {Number} articleId 文章id
 * @returns Promise
 */
export const getArticleDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    params: {
      article_id: articleId
    }
  })
}

/**
 * 添加关注
 * @param {Number} userId
 * @returns Promise
 */
export const addFocus = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注
export const delFocus = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 添加收藏
export const addCollect = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消收藏
export const delCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 点赞
export const addLiking = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消点赞
export const delLiking = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
