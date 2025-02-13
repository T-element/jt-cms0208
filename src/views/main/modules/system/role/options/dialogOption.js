const dialogOption = {
  title: '新建用户',
  formOption: [
    {
      type: 'label',
      label: '角色名称',
      placeholder: '请输入角色名称',
      key: 'name',
    },
    {
      type: 'label',
      label: '角色描述',
      placeholder: '请输入角色描述',
      key: 'intro',
    },
    {
      type: 'custom',
      key: 'intro',
    },
  ],
}

export default dialogOption
