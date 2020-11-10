<template>
  <div class="main">
    <div class="roleInfo">roleInfo
      <div class="">equment</div>
    </div>
    <div class="">map
      <div class="">options</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {

    }
  }
})
</script>

<style lang="less" scoped>
.main{
  height: calc(100vh - 30px);
  width: 1200px;
  margin: 0 auto;
  display: flex;
  .roleInfo{
    width: 150px;
    height: 100%;
  }
}
</style>
