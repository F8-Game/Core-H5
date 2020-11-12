<template>
  <div class="msg">
    message
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.msg{
  height: calc(100vh - 540px);
  border: 1px solid #ccc;
}
</style>
