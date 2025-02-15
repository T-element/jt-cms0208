const contentOption = {
  header: {
    title: '故事列表',
  },
  content: {
    tableOption: [
      { type: 'index', label: '序号', width: '70' },
      { prop: 'name', label: '故事标题', width: '150' },
      { prop: 'story', label: '我的故事', fit: true },
      { prop: 'createAt', label: '创建时间', minWidth: '120', type: 'createDate' },
    ],
  },
}

export default contentOption
