const contentOption = {
  header: {
    title: '菜单列表',
    btnName: '新建菜单',
  },
  content: {
    tableOption: [
      { prop: 'name', label: '菜单名称', width: '180' },
      { prop: 'type', label: '级别', width: '100' },
      { prop: 'url', label: '菜单url', width: '150', showOverflowTooltip: true },
      {
        prop: 'icon',
        label: '菜单icon',
        width: '100',
        type: 'custom',
        slotName: 'menuIcon',
      },
      { prop: 'sort', label: '排序', width: '100' },
      { prop: 'createAt', label: '创建时间', minWidth: '120', type: 'createDate' },
      { prop: 'updateAt', label: '更新时间', minWidth: '120', type: 'updateDate' },
      { label: '操作', width: '170', type: 'operation' },
    ],
  },
}

export default contentOption
