<template>
  <div class="msg">
    message
    <div></div>
    <a-input-group compact class="sendMsg">
      <a-select v-model:value="channel" class="channel">
        <a-select-option value="系统">
          系统
        </a-select-option>
        <a-select-option value="世界">
          世界
        </a-select-option>
        <a-select-option value="战斗">
          战斗
        </a-select-option>
      </a-select>
      <a-input v-model:value="msg" class="send"/>
    </a-input-group>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref('')
    const channel = ref('世界')
    return {
      msg,
      channel
    }
  }
})
</script>

<style lang="less" scoped>
.msg{
  height: calc(100vh - 540px);
  border: 1px solid #ccc;
  position: relative;
  .sendMsg{
    position: absolute;
    bottom: -1px;
    left: -1px;
    width: 100%;
    .channel{
      width: 30%;
    }
    .send{
      width: calc(100% - 30%);
    }
  }
}
</style>
