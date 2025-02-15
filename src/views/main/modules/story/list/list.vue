<template>
  <div class="list">
    <PageContent :option="contentOption" />
  </div>
</template>

<script>
import PageContent from '@/components/pageContent.vue'
import contentOption from './options/contentOption'

export default {
  components: {
    PageContent,
  },
  data() {
    return {
      contentOption,
    }
  },
}
</script>

<style lang="less" scoped>
.list {
}
</style>
