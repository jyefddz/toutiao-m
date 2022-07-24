// 封装本地存储
// class 封装 继承 多态
class Storage {
  // localStorage.setItem
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  // localStorage.getItem
  get(key) {
    // 如果parse 是一个JSON格式字符串, JSON.parse
    // 不是 return
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
