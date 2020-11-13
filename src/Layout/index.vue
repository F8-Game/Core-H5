<template>
  <div class="header">{{header}}</div>
  <div class="content">
    <router-view />
  </div>
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
.content{
  padding: 0 40px;
}
</style>
