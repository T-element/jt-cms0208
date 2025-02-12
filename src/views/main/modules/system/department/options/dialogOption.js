const dialogOption = {
  title: '新建部门',
  formOption: [
    {
      type: 'label',
      label: '部门名称',
      placeholder: '请输入部门名称',
      key: 'name',
    },
    {
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门',
      key: 'parentId',
      selectOptions: [],
    },
    {
      type: 'label',
      label: '领导名称',
      placeholder: '请输入领导名称',
      key: 'leader',
    },
  ],
}

export default dialogOption
