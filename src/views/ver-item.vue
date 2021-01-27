<template>
  <div class="ver-item">
    <a target="_blank" :href="s.href">{{ s.ver }} ({{ s.pos }})</a>
  </div>
</template>

<script>
import { DownloadUrl } from '@/constants/chromium'

export default {
  name: 'ver-item',
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    s() {
      return this.source
    },
  },
}
</script>
<style lang="less" scoped>
.ver-item {
  display: flex;
  align-items: center;
  height: 26px;
}
</style>
