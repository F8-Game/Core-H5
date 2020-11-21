<template>
  <div class="userInfo">
    <div class="info-box">
      <img src="../../assets/user.jpg" class="ava">
      <div class="detail">
        <div>{{info.username}}</div>
        <div>{{info.title}}</div>
        <div>
          银币: {{info.s_coin}}
        </div>
        <div>
          金币: {{info.g_coin}}
        </div>
      </div>
    </div>
    <a-row type="flex" justify="space-around">
      <a-col :span='10'>
        <div>经验:{{info.exp}}</div>
        <div>血量:{{info.c_hp}}</div>
        <a-progress :percent='currentPercent' :show-info="false"/>
        <div>气血储备:{{info.hp_store}}</div>
        <div>物攻:{{info.mag_damage}}</div>
        <div>物防:{{info.mag_defense}}</div>
        <div>速度{{info.speed}}</div>
      </a-col>
      <a-col :span='10'>
        <div>升级经验:{{info.upg_exp}}</div>
        <div>蓝量:{{info.c_mp}}</div>
        <a-progress :percent="currentPercent" :show-info="false"/>
        <div>魔法储备:{{info.mp_store}}</div>
        <div>法攻:{{info.phy_damage}}</div>
        <div>法防:{{info.phy_defense}}</div>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col :span='10'>
        <div>力量{{info.str}}</div>
        <div>法力{{info.int}}</div>
        <div>体质{{info.con}}</div>
        <div>耐力{{info.vit}}</div>
        <div>敏捷{{info.agi}}</div>
      </a-col>
      <a-col :span='10'>
        <div>可分配{{info.attr_point}}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup(props) {
    const currentPercent = computed(() =>
      parseInt((props.info.c_hp / props.info.c_mp) * 100 > 100 ? 100 : parseInt((props.info.c_hp / props.info.c_mp) * 100)
      ))
    return {
      currentPercent
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
})
</script>

<style lang="less" scoped>
.userInfo{
  width: 100%;
  height: 450px;
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
