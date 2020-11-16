<template>
  <div
class="man"
    :style="{
      animationDelay: `${randomNum(0, 6) / 10}s`,
      animationDuration: `${1 * (hpPercent + .5)}s`
    }"
  >
    <div class="hp">
      <span :style="{ width: `${hpPercent * 100}%` }">{{hp}}/{{hp_total}}</span>
    </div>
    <div class="mp">
      <span :style="{ width: `${mpPercent * 100}%` }">{{mp}}/{{mp_total}}</span>
    </div>
    <div class="usname">
      {{manName}}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { randomNum } from '../../util/tools.js'
export default defineComponent({
  props: {
    manName: { type: String },
    hp: { type: Number },
    hp_total: { type: Number },
    mp: { type: Number },
    mp_total: { type: Number }
  },
  setup() {
    return {
      randomNum
    }
  },
  computed: {
    hpPercent() {
      return this.hp / this.hp_total
    },
    mpPercent() {
      return this.mp / this.mp_total
    }
  }
})
</script>

<style lang="less" scoped>
.man {
  position: absolute;
  animation: manframe .5s infinite 1s;
  .hp, .mp {
    border: 1px solid #E3EAF0;
    border-radius: 5px;
    width: 100%;
    height: 15px;
    line-height: 12px;
    span {
      display: inline-block;
      height: 100%;
      font-size: 12px;
    }
  }
  .hp span {
    background: #3df1a0;
  }
  .mp span {
    background: #46c4ff;
  }
  .usname {
    font-size: 40px;
    font-family: 'ZCOOLKuaiLe-Regular';
  }
}
@keyframes manframe {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(0, 4px) rotate(10deg); }
  50% { transform: translate(4px, 4px) rotate(0deg); }
  75% { transform: translate(0, 4px) rotate(-10deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
</style>
