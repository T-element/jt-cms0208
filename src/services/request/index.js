import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
const timeout = import.meta.env.VITE_TIMEOUT

class JTRequest {
  constructor(config) {
    this.instance = axios.create({
      baseURL: config.baseURL ?? baseURL,
      timeout: config.timeout ?? timeout,
    })

    this.instance.interceptors.request.use(
      config.interceptors?.request?.successFn,
      config.interceptors?.request?.failFn,
    )

    this.instance.interceptors.response.use(
      config.interceptors?.response?.successFn,
      config.interceptors?.response?.failFn,
    )
  }

  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({
      ...config,
      method: 'GET',
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: 'POST',
    })
  }

  patch(config) {
    return this.request({
      ...config,
      method: 'PATCH',
    })
  }

  delete(config) {
    return this.request({
      ...config,
      method: 'DELETE',
    })
  }
}

export default JTRequest
