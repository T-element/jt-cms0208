import jtRequest from '..'

export function loginRequest(prop) {
  return jtRequest.post({

    url: '/user/login',
    // url: 'http://127.0.0.1:3000/user/login',
    data: {
      ...prop,
    },
  })
}
