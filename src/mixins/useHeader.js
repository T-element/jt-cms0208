const useHeader = function (viewConfig) {
  return {
    methods: {
      handleQueryClick(data) {
        this.queryConfig = { ...data }
        if (viewConfig.viewName === 'goods') this.requestConfig.requestMode = 'query'
        this.$store.dispatch(viewConfig.listPath, {
          ...this.requestConfig,
          ...data,
        })
        if (viewConfig.viewName === 'goods') delete this.requestConfig.requestMode
      },
    },
  }
}

export default useHeader
