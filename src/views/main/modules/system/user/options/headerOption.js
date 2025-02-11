const headerOption = [
  {
    name: '用户名',
    placeholder: '请输入用户名',
    key: 'name',
    type: 'input',
  },
  {
    name: '真实姓名',
    placeholder: '请输入真实姓名',
    key: 'realname',
    type: 'input',
  },
  {
    name: '手机号码',
    placeholder: '请输入手机号码',
    key: 'cellphone',
    type: 'input',
  },
  {
    name: '状态',
    placeholder: '请选择状态',
    key: 'enable',
    type: 'select',
    selectOptions: [
      {
        name: '启用',
        value: 1,
      },
      {
        name: '禁用',
        value: 0,
      },
    ],
  },
  {
    name: '创建时间',
    type: 'datePicker',
    key: 'createAt',
  },
]

export default headerOption
