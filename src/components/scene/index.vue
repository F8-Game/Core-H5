<template>
  <div class="scene">
    <man
      v-for="(user, index) in users"
      :key="user.name"
      :manName="user.name"
      :hp="user.hp"
      :hp_total="user.hp_total"
      :mp="user.mp"
      :mp_total="user.mp_total"
      :style="{
        left: `${index % 2 * 15 + 10}%`,
        top: `${index * 15 + 15}%`
      }"
    />
    <div class="vs">V S</div>
    <man
      v-for="(monster, index) in monsters"
      :key="monster.name"
      :manName="monster.name"
      :hp="monster.hp"
      :hp_total="monster.hp_total"
      :mp="monster.mp"
      :mp_total="monster.mp_total"
      :style="{
        left: `${index % 2 * 15 + 70}%`,
        top: `${index * 15 + 15}%`
      }"
    />
  </div>
</template>

<script>
import man from './man.vue'
import { defineComponent } from 'vue'
// const existNum = []
export default defineComponent({
  components: { man },
  setup() {
    return {
      users: [
        { name: '夏影', hp: 20, hp_total: 200, mp: 20, mp_total: 20 },
        { name: 'andy', hp: 40, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '铁名', hp: 60, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '智慧树', hp: 80, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '青石', hp: 100, hp_total: 200, mp: 20, mp_total: 20 }
      ],
      monsters: [
        { name: '小花猫', hp: 120, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '小花狗', hp: 140, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '小花猪', hp: 160, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '小花牛', hp: 180, hp_total: 200, mp: 20, mp_total: 20 },
        { name: '小花什么', hp: 200, hp_total: 200, mp: 20, mp_total: 20 }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.scene {
  .vs {
    position: absolute;
    left: calc(50% - 30px);
    top: calc(50% - 30px);
    font-size: 60px;
    font-family: 'ZCOOLKuaiLe-Regular';
    animation: vsframe .5s infinite;
    color: #f7d770;
  }
  @keyframes vsframe {
    0% { transform: scale(1); text-shadow: 0 0 4px white, 0 -5px 4px #ff3, 2px -10px 6px #fd3, -2px -15px 11px #f80, 2px -25px 18px #f20; }
    25% { transform: scale(1.0); text-shadow: 0 0 4px white, 2px -7px 6px #ff3, 2px -12px 8px #fd3, -3px -20px 11px #f80, 4px -30px 22px #f20; }
    50% { transform: scale(0.9); text-shadow: 0 0 4px white, 2px -10px 8px #ff3, 2px -14px 10px #fd3, -4px -25px 11px #f80, 4px -35px 25px #f20; }
    75% { transform: scale(1.1); text-shadow: 0 0 4px white, 2px -7px 6px #ff3, 2px -12px 8px #fd3, -3px -20px 11px #f80, 4px -30px 22px #f20; }
    100% { transform: scale(1); text-shadow: 0 0 4px white, 0 -5px 4px #ff3, 2px -10px 6px #fd3, -2px -15px 11px #f80, 2px -25px 18px #f20; }
  }
}
</style>
