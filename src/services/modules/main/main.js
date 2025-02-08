import jtRequest from '..'

export function getRoleMenuByRoleId(roleId) {
  return jtRequest.get({
    url: `/role/${roleId}/menu`,
  })
}
