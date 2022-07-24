import request from '@/utils/request'
// 获取评论或评论回复
export const getAllCommentList = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 对评论或评论回复点赞
export const addCommentLike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 对评论或评论回复取消点赞
export const delCommentLike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 发布评论或评论回复
export const postComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
