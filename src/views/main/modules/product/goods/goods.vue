<template>
  <div class="goods">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="goodsList"
      :total-count="goodsTotalCount"
      @pager-change="handlePagerChange"
      @create-click="handleCreate"
      @delete-click="handleDelete"
      @edit-click="handleEdit"
    >
      <template #imgBox="scoped">
        <el-image
          class="tableImg"
          style="width: 60px; height: 80px"
          :src="scoped.data.imgUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scoped.data.imgUrl]"
          show-progress
          fit="contain"
          :preview-teleported="true"
        />
      </template>
    </PageContent>
    <PageDialog
      ref="dialogRef"
      :option="dialogOption"
      @confirm-click="handleConfirmClick"
    />
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader.vue'
import PageContent from '@/components/pageContent.vue'
import PageDialog from '@/components/pageDialog.vue'
import headerOption from './options/headerOption'
import contentOption from './options/contentOption'
import dialogOption from './options/dialogOption'
import { mapState } from 'vuex'
import { deleteGoodsById, createGoods, editGoods } from '@/services'

const viewConfig = {
  listPath: 'product/fetchGoodsInfo',
  createFn: createGoods,
  editFn: editGoods,
  deleteFn: deleteGoodsById,
}

export default {
  components: {
    PageHeader,
    PageContent,
    PageDialog,
  },
  data() {
    return {
      headerOption,
      headerData: {
        name: '',
        address: '',
        status: '',
        createAt: '',
      },
      contentOption,
      dialogOption,

      requestConfig: {
        offset: 0,
        size: 10,
      },
      queryConfig: {},
    }
  },
  computed: {
    ...mapState('product', {
      goodsList: (state) => state.goodsList,
      goodsTotalCount: (state) => state.goodsTotalCount,
    }),
  },
  created() {
    const dispatch = this.$store.dispatch
    dispatch(viewConfig.listPath, this.requestConfig)
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
      this.$refs.dialogRef.setFormState({})
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
      this.$refs.dialogRef.setFormState(data, 'edit')
    },
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
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
    handleQueryClick(data) {
      this.queryConfig = { ...data }
      this.requestConfig.requestMode = 'query'
      this.$store.dispatch(viewConfig.listPath, {
        ...this.requestConfig,
        ...data,
      })
      delete this.requestConfig.requestMode
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
</script>

<style lang="less" scoped>
.goods {
  border-radius: 8px;
  overflow: hidden;
}
</style>
