import JTRequest from '../request'

const jtRequest = new JTRequest({
  interceptors: {
    request: {
      successFn: (config) => {
        console.log('requestSuccess', config)
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

export default jtRequest
