
import config from '@src/config'
// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'http://localhost:8888/api/',
  baseURL: config.BASE_URL
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// Vue.prototype.$http = axiosIns

export default axiosIns
