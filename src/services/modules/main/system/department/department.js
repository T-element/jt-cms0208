import jtRequest from '@/services/modules'

export function getDepartmentById(id) {
  return jtRequest.get({
    url: `/department/${id}`,
  })
}

export function createDepartment(data) {
  return jtRequest.post({
    url: '/department',
    data: {
      ...data,
    },
  })
}

export function patchDepartment(data) {
  const { id, name, leader, parentId } = data
  return jtRequest.patch({
    url: `/department/${id}`,
    data: {
      name,
      leader,
      parentId,
    },
  })
}

export function deleteDepartmentById(id) {
  return jtRequest.delete({
    url: `/department/${id}`,
  })
}
