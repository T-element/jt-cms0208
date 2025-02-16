const useDialog = function (viewConfig) {
  return {
    methods: {
      async handleConfirmClick(data, mode) {
        let res
        if (mode === 'create') {
          res = await viewConfig.createFn(data)
        } else if (mode === 'edit') {
          res = await viewConfig.editFn(data)
        }
        this.$store.dispatch(viewConfig.listPath, {
          ...this.requestConfig,
          ...this.queryConfig,
        })
        console.log(res)
        ElMessage({
          message: res.status === 200 || res.status === 201 ? '操作成功' : res.message,
          type: res.status === 200 || res.status === 201 ? 'success' : 'error',
        })
      },
      setupDialogSelectOption(list, targetLabel) {
        const selectOptions = list.map((item) => {
          return { label: item.name, value: item.id }
        })
        const index = this.dialogOption.formOption.findIndex(
          (item) => item.label === targetLabel,
        )
        this.dialogOption.formOption[index].selectOptions = selectOptions
      },
    },
  }
}

export default useDialog
