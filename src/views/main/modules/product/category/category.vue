<template>
  <div class="category">
    <PageHeader
      :option="headerOption"
      :data="headerData"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :option="contentOption"
      :data="categoryList"
      :total-count="categoryTotalCount"
      @pager-change="handlePagerChange"
      @create-click="handleCreateCategory"
      @delete-click="handleDeleteCategory"
      @edit-click="handleEditCategory"
    >
      <template #enable="scoped">
        <el-button
          :type="scoped.data.enable === 1 ? 'success' : 'danger'"
          size="small"
          plain
          @click="onEnableBtnClick(scoped)"
        >
          {{ scoped.data.enable === 1 ? '启用' : '禁用' }}
        </el-button>
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
import { deleteCategoryById, createCategory, editCategory } from '@/services'

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
        createAt: '',
      },
      contentOption,
      dialogOption,
      // dialogData: {
      //   name: '',
      //   realname: '',
      //   password: '',
      //   cellphone: '',
      //   departmentId: '',
      //   roleId: '',
      // },

      requestConfig: {
        offset: 0,
        size: 10,
      },
    }
  },
  computed: {
    ...mapState('product', {
      categoryList: (state) => state.categoryList,
      categoryTotalCount: (state) => state.categoryTotalCount,
    }),
  },
  created() {
    const dispatch = this.$store.dispatch
    dispatch('product/fetchCategoryInfo', this.requestConfig)
  },
  methods: {
    onEnableBtnClick(prop) {
      prop.data.enable === 1 ? (prop.data.enable = 0) : (prop.data.enable = 1)
    },
    handlePagerChange(prop) {
      this.requestConfig = {
        offset: --prop.currentPage * prop.size,
        size: prop.size,
      }
      this.$store.dispatch('product/fetchCategoryInfo', this.requestConfig)
    },
    handleCreateCategory() {
      this.$refs.dialogRef.setFormState({})
    },
    async handleDeleteCategory(id) {
      const res = await deleteCategoryById(id)
      if (res.data.code !== 0) {
        ElMessage({
          message: res.data.data,
          type: 'warning',
        })
      }
      this.$store.dispatch('system/fetchUserList', this.requestConfig)
    },
    handleEditCategory(data) {
      this.$refs.dialogRef.setFormState(data, 'edit')
    },
    async handleConfirmClick(data, mode) {
      console.log(data, mode)
      let res
      if (mode === 'create') {
        res = await createCategory(data)
      } else if (mode === 'edit') {
        res = await editCategory(data)
      }
      this.$store.dispatch('product/fetchCategoryInfo', this.requestConfig)
      ElMessage({
        message: res.data.data,
        type: res.data.code === 0 ? 'success' : 'error',
      })
    },
    handleQueryClick(data) {
      this.$store.dispatch('product/fetchCategoryInfo', {
        ...this.requestConfig,
        ...data,
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
</script>

<style lang="less" scoped>
.category {
  border-radius: 8px;
  overflow: hidden;
}
</style>
