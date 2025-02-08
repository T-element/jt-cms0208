import jtRequest from '..'

export function loginRequest(prop) {
  return jtRequest.post({
    url: '/login',
    data: {
      ...prop,
    },
  })
}
