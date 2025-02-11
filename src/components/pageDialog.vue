<template>
  <div class="pageDialog">
    <el-dialog
      v-model="dialogFormVisible"
      :title="option.title"
      width="500"
      header-class="header"
      center
    >
      <el-form label-width="auto" size="large">
        <template v-for="(item, index) in $props.option.formOption" :key="index">
          <el-form-item
            v-if="!(currentMode !== 'create' && item.showState === 'createOnly')"
            :label="item.label"
          >
            <el-input
              v-if="item.type === 'label'"
              v-model="formData[item.key]"
              :placeholder="item.placeholder"
            ></el-input>
            <el-select
              v-else-if="item.type === 'select'"
              v-model="formData[item.key]"
              :placeholder="item.placeholder"
            >
              <template v-for="(iten, indey) in item.selectOptions" :key="indey">
                <el-option v-bind="iten" />
              </template>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <div class="footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      formData: {},
      currentMode: '',
    }
  },
  emits: ['confirmClick'],
  methods: {
    onConfirmClick() {
      this.$emit('confirmClick', { ...this.formData }, this.currentMode)
      this.dialogFormVisible = false
    },

    setFormState(data, mode = 'create') {
      this.dialogFormVisible = true
      this.currentMode = mode
      this.formData = data
    },
  },
  expose: ['setFormState'],
}
</script>

<style lang="less" scoped>
.pageDialog {
  :deep(.el-dialog) {
    .header {
      padding-right: 0;
    }

    .el-form {
      margin-top: 10px;
      padding: 0 30px;
    }
  }
}
</style>
