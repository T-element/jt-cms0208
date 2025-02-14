const headerOption = [
  {
    name: '商品名称',
    placeholder: '请输入商品名称',
    key: 'name',
    type: 'input',
  },
  {
    name: '商品地址',
    placeholder: '请输入商品地址',
    key: 'address',
    type: 'input',
  },
  {
    name: '商品状态',
    placeholder: '请选择商品状态',
    key: 'status',
    type: 'select',
    selectOptions: [
      { name: '可用', value: 1 },
      { name: '下架', value: 0 },
    ],
  },
  {
    name: '创建时间',
    type: 'datePicker',
    key: 'createAt',
  },
]

export default headerOption
