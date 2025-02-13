import jtRequest from '@/services/modules'

export function deleteRoleById(id) {
  return jtRequest.delete({
    url: `/role/${id}`,
  })
}

export function createRole(data) {
  return jtRequest.post({
    url: '/role',
    data: {
      ...data,
    },
  })
}
