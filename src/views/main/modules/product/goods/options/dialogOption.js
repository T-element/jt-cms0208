const dialogOption = {
  title: '新建分类',
  formOption: [
    {
      type: 'label',
      label: '商品名称',
      placeholder: '请输入商品名称',
      key: 'name',
    },
    {
      type: 'label',
      label: '原价格',
      placeholder: '请输入原价格',
      key: 'oldPrice',
    },
    {
      type: 'label',
      label: '新价格',
      placeholder: '请输入新价格',
      key: 'newPrice',
    },
    {
      type: 'label',
      label: '描述',
      placeholder: '请输入描述',
      key: 'desc',
    },
    {
      type: 'label',
      label: '图片',
      placeholder: '请输入图片地址',
      key: 'imgUrl',
    },
    {
      type: 'select',
      label: '商品状态',
      placeholder: '请选择商品状态',
      key: 'status',
      selectOptions: [
        { label: '可用', value: 1 },
        { label: '下架', value: 0 },
      ],
    },
    {
      type: 'label',
      label: '库存',
      placeholder: '请输入库存',
      key: 'inventoryCount',
    },
    {
      type: 'label',
      label: '销量',
      placeholder: '请输入销量',
      key: 'saleCount',
    },
    {
      type: 'label',
      label: '收藏',
      placeholder: '请输入收藏数',
      key: 'favorCount',
    },
    {
      type: 'label',
      label: '地址',
      placeholder: '请输入地址',
      key: 'address',
    },
  ],
}

export default dialogOption
