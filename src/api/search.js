import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 * 获取搜索建议
 * @param {String} q 搜索建议的关键词
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {String} q 搜索关键词
 * @returns Promise
 */
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}

const HEIMA_TOUTIAO_HISTORY = 'HEIMA_TOUTIAO_HISTORY'
export const getHistoryByLocal = () => storage.get(HEIMA_TOUTIAO_HISTORY)
export const setHistoryToLocal = (value) =>
  storage.set(HEIMA_TOUTIAO_HISTORY, value)
