<template>
  <div class="header">{{header}}</div>
  <router-view />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const header = ref('header')
    return {
      header
    }
  }
})
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #ccc;
}
</style>
