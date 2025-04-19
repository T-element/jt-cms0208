import jtRequest from '../../..'

export function getUsersList(config) {
  return jtRequest.post({
    // url: '/users/list',
    url: '/user/list',
    data: {
      ...config,
    },
  })
}

export function getRoleList(config = { offset: 0, size: 100 }) {
  return jtRequest.post({
    url: '/role/list',
    data: {
      ...config,
    },
  })
}

export function getDepartmentList(config = { offset: 0, size: 100 }) {
  return jtRequest.post({
    url: '/department/list',
    data: {
      ...config,
    },
  })
}

export function createUser(prop) {
  return jtRequest.post({
    // url: '/users',
    url: '/user/create',
    data: {
      ...prop,
    },
  })
}

export function deleteUserById(id) {
  return jtRequest.delete({
    // url: `/users/${id}`,
    url: `/user/${id}`,
  })
}

export function patchUser(data) {
  const { id, name, realname, cellphone, roleId, departmentId } = data

  return jtRequest.patch({
    // url: `/users/${id}`,
    url: `/user/${id}`,
    data: {
      name,
      realname,
      cellphone,
      roleId,
      departmentId,
    },
  })
}
