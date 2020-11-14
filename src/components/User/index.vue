<template>
  <div class="userInfo">
    <div class="info-box">
      <img src="../../assets/user.jpg" class="ava">
      <div class="detail">
        <div>安迪の铁名</div>
        <div>上古大仙</div>
        <div>
          银币: 135135
        </div>
        <div>
          金币: 135135
        </div>
      </div>
    </div>
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
.userInfo{
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  margin: 20px 0;

  .info-box{
    display: flex;

    .ava{
      width: 100px;
      height: 100px;
      margin-right: 30px;
      padding: 15px;
    }
    .detail{
      padding: 10px 0;
      line-height: 25px;
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>
