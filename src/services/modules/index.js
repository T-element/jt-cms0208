import JTRequest from '../request'

const jtRequest = new JTRequest({
  interceptors: {
    request: {
      successFn: (config) => {
        console.log('requestSuccess', config)
        formatObjData(config.data)
        if (config.url === '/login') return config
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem('login/token')}`,
        }
        return config
      },
      failFn: (config) => {
        console.log('requestFail', config)
        return config
      },
    },
    // response: {
    //   successFn: (config) => {
    //     console.log('responeSuccess', config)
    //     return config
    //   },
    //   failFn: (config) => {
    //     console.log('responeFail', config)
    //     return config
    //   },
    // },
  },
})

function formatObjData(data) {
  if (data === null || data === undefined || !(data instanceof Object)) return
  const keys = Object.keys(data)
  keys.forEach((key) => {
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim()
    }
  })
}

export default jtRequest
