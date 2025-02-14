const contentOption = {
  header: {
    title: '商品列表',
    btnName: '新建商品',
  },
  content: {
    tableOption: [
      { type: 'selection', width: '55' },
      { type: 'index', label: '序号', width: '70' },
      { prop: 'name', label: '商品名称', width: '120', showOverflowTooltip: true },
      { prop: 'oldPrice', label: '原价格', width: '80' },
      { prop: 'newPrice', label: '新价格', width: '80' },
      { prop: 'desc', label: '商品描述', width: '120', showOverflowTooltip: true },
      { label: '图片', width: '100', type: 'custom', slotName: 'imgBox' },
      { prop: 'inventoryCount', label: '库存', width: '100' },
      { prop: 'saleCount', label: '销量', width: '100' },
      { prop: 'favorCount', label: '收藏', width: '100' },
      { prop: 'address', label: '地址', width: '80' },
      { prop: 'createAt', label: '创建时间', minWidth: '120', type: 'createDate' },
      { prop: 'updateAt', label: '更新时间', minWidth: '120', type: 'updateDate' },
      { label: '操作', width: '170', type: 'operation' },
    ],
  },
}

export default contentOption
