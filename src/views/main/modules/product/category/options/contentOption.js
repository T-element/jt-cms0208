const contentOption = {
  header: {
    title: '类别列表',
    btnName: '新建类别',
  },
  content: {
    tableOption: [
      { type: 'selection', width: '55' },
      { type: 'index', label: '序号', width: '70' },
      { prop: 'name', label: '类别名称', width: '180' },
      { prop: 'createAt', label: '创建时间', minWidth: '120', type: 'createDate' },
      { prop: 'updateAt', label: '更新时间', minWidth: '120', type: 'updateDate' },
      { label: '操作', width: '170', type: 'operation' },
    ],
  },
}

export default contentOption
