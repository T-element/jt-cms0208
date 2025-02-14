<template>
  <div class="pageHeader">
    <el-form
      ref="formRef"
      :model="data"
      label-width="100"
      size="large"
      style="padding: 20px 20px 0"
    >
      <el-row>
        <template v-for="(item, index) in option" :key="index">
          <el-col :sm="12" :md="12" :lg="8">
            <el-form-item :label="item.name" :prop="item.key" style="padding: 10px 40px">
              <el-input
                v-if="item.type === 'input'"
                v-model="data[item.key]"
                :placeholder="item.placeholder"
              />
              <el-select
                v-else-if="item.type === 'select'"
                v-model="data[item.key]"
                :placeholder="item.placeholder"
              >
                <template v-for="(iten, indey) in item.selectOptions" :key="indey">
                  <el-option :label="iten.name" :value="iten.value" />
                </template>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'datePicker'"
                v-model="data[item.key]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button type="default" @click="onResetBtnClick">
        <el-icon><Refresh /></el-icon>
        <span> 重置</span>
      </el-button>
      <el-button type="primary" @click="onQueryBtnClick">
        <el-icon><Search /></el-icon>
        <span> 查询</span>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {}
  },
  emits: ['queryBtnClick'],
  methods: {
    onResetBtnClick() {
      this.$refs.formRef.resetFields()
    },
    onQueryBtnClick() {
      this.$emit('queryBtnClick', { ...this.$props.data })
    },
  },
}
</script>

<style lang="less" scoped>
.pageHeader {
  background-color: #fff;

  .btns {
    display: flex;
    justify-content: flex-end;
    padding: 0 70px 20px 0;

    .el-button {
      padding: 15px;
    }
  }
}
</style>
