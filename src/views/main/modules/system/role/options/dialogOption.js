const dialogOption = {
  title: '新建用户',
  formOption: [
    {
      type: 'label',
      label: '用户名',
      placeholder: '请输入用户名',
      key: 'name',
    },
    {
      type: 'label',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      key: 'realname',
    },
    {
      type: 'label',
      label: '密码',
      placeholder: '请输入密码',
      key: 'password',
      showState: 'createOnly',
    },
    {
      type: 'label',
      label: '电话号码',
      placeholder: '请输入电话号码',
      key: 'cellphone',
    },
    {
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      key: 'roleId',
      selectOptions: [],
    },
    {
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      key: 'departmentId',
      selectOptions: [],
    },
  ],
}

export default dialogOption
