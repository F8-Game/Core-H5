<template>
  <a-row>
    <a-col :span='4'>
      <img src="../../assets/logo.jpg" class="logo">
      <user />
      <msg />
    </a-col>
    <a-col :span='19' offset='1'>
      <a-tabs v-model:activeKey="firstDefTab" style="height: 500px">
        <a-tab-pane :tab="item.name" v-for="item in levalFirst" :key="item.id">
          <scene />
        </a-tab-pane>
      </a-tabs>
      <a-tabs v-model:activeKey="secondDefTab" class="secTab">
        <a-tab-pane :tab="item.name" v-for="item in levalSecond" :key="item.id">
          Content of Tab Pane 1
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, ref } from 'vue'
import user from '@components/User'
import msg from '@components/Message'
import scene from '@components/scene'
import Game from '../../util/game.js'
export default defineComponent({
  setup() {
    const levalFirst = ref([
      {
        name: '战斗',
        id: 1
      },
      {
        name: '地图',
        id: 2
      },
      {
        name: '商城',
        id: 3
      },
      {
        name: '活动',
        id: 4
      },
      {
        name: '',
        id: 5
      }
    ])
    const levalSecond = ref([
      {
        name: '装备',
        id: 1
      },
      {
        name: '背包',
        id: 2
      },
      {
        name: '技能',
        id: 3
      },
      {
        name: '专业',
        id: 4
      },
      {
        name: '任务',
        id: 5
      },
      {
        name: '宠物',
        id: 6
      }
    ])
    const firstDefTab = ref(1)
    const secondDefTab = ref(1)
    return {
      levalFirst,
      firstDefTab,
      levalSecond,
      secondDefTab
    }
  },
  components: {
    user,
    msg,
    scene
  },
  mounted() {
    new Game()
  }
})
</script>

<style lang="less" scoped>
.logo{
  width: 100%;
  height: 150px;
}
.secTab{
  min-height: calc(100vh - 530px);
}
</style>
