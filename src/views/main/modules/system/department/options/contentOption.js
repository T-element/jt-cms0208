const contentOption = {
  header: {
    title: '部门列表',
    btnName: '新建部门',
  },
  content: {
    tableOption: [
      { type: 'selection', width: '55' },
      { type: 'index', label: '序号', width: '70' },
      { prop: 'name', label: '部门名称', width: '120' },
      { prop: 'leader', label: '部门领导', width: '120' },
      {
        prop: 'parentId',
        label: '上级部门',
        width: '100',
        type: 'custom',
        slotName: 'leader',
      },
      { prop: 'createAt', label: '创建时间', minWidth: '120', type: 'createDate' },
      { prop: 'updateAt', label: '更新时间', minWidth: '120', type: 'updateDate' },
      { label: '操作', width: '170', type: 'operation' },
    ],
  },
}

export default contentOption
