const useContent = function (viewConfig) {
  return {
    data() {
      return {}
    },
    methods: {
      handlePagerChange(prop) {
        this.requestConfig = {
          offset: --prop.currentPage * prop.size,
          size: prop.size,
        }
        this.$store.dispatch(viewConfig.listPath, {
          ...this.requestConfig,
          ...this.queryConfig,
        })
      },
      handleCreate() {
        this.$refs.dialogRef?.setFormState({})
      },
      async handleDelete(id) {
        const res = await viewConfig.deleteFn(id)
        if (res.data.code !== 0) {
          ElMessage({
            message: res.data.data,
            type: 'warning',
          })
        }
        this.$store.dispatch(viewConfig.listPath, {
          ...this.requestConfig,
          ...this.queryConfig,
        })
      },
      handleEdit(data) {
        this.$refs.dialogRef?.setFormState(data, 'edit')
      },
    },
  }
}

export default useContent
