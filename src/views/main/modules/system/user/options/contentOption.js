const contentOption = {
  header: {
    title: '用户列表',
    btnName: '新建用户',
  },
  content: {
    tableOption: [
      { type: 'selection', width: '55' },
      { type: 'index', label: '序号', width: '70' },
      { prop: 'name', label: '用户名', width: '120' },
      { prop: 'realname', label: '真实姓名', width: '120' },
      { prop: 'cellphone', label: '手机号码', width: '150' },
      { prop: 'enable', label: '状态', width: '100', type: 'custom', slotName: 'enable' },
      { prop: 'createAt', label: '创建时间', minWidth: '110', type: 'createDate' },
      { prop: 'updateAt', label: '更新时间', minWidth: '110', type: 'updateDate' },
      { label: '操作', width: '170', type: 'operation' },
    ],
  },
}

export default contentOption
