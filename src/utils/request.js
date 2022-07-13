// 引入axios
import axios from 'axios'
// 配置axios的默认配置
// 创建一个全新的axios对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
export default request
