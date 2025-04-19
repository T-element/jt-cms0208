import jtRequest from '..'

export function getRoleMenuByRoleId(userId) {
  return jtRequest.get({
    // url: `/role/${roleId}/menu`,
    url: `/systemMenu/${userId}`
  })
}
