<template>
  <a-row>
    <a-col :span='4'>
      <!-- <img src="../../assets/logo.png" class="logo"> -->
      <user :info='state.userInfo'/>
      <msg />
    </a-col>
    <a-col :span='13' offset='1'>
      <a-tabs v-model:activeKey="firstDefTab" style="height: 350px" @change='getFirstTab'>
        <a-tab-pane :tab="item.name" v-for="item in state.levalFirst" :key="item.id">
          <!-- <scene /> -->
          <component :is='state.setFirstComponent'/>
        </a-tab-pane>
      </a-tabs>
      <a-tabs v-model:activeKey="secondDefTab" class="secTab" @change='getSecondTab'>
        <a-tab-pane :tab="item.name" v-for="item in state.levalSecond" :key="item.id">
          <component :is='state.setSecondComponent'/>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :span='5' offset='1'>
      Content
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import user from '@components/User'
import msg from '@components/Message'
import { getUserInfo } from '@/api/user'
// 第一层tab
import scene from '@components/Scene'
import maps from '@components/Map'
import shop from '@components/Shop'
import activity from '@components/Activity'
// 第二层tab
import eq from '@components/Equipment'
import backpack from '@components/Backpack'
import practice from '@components/Practice'
import pets from '@components/Pets'
import task from '@components/Task'

export default defineComponent({
  setup() {
    const firstDefTab = ref(1)
    const secondDefTab = ref(1)
    const state = reactive({
      userInfo: {},
      levalFirst: [
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
        }
      ],
      enmu1: {
        1: 'scene',
        2: 'maps',
        3: 'shop',
        4: 'activity'
      },
      setFirstComponent: 'scene',
      levalSecond: [
        {
          name: '装备',
          id: 1
        },
        {
          name: '背包',
          id: 2
        },
        {
          name: '修炼',
          id: 3
        },
        {
          name: '宠物',
          id: 4
        },
        {
          name: '任务',
          id: 5
        }
      ],
      enmu2: {
        1: 'eq',
        2: 'backpack',
        3: 'practice',
        4: 'pets',
        5: 'task'
      },
      setSecondComponent: 'eq'
    })
    onMounted(() => {
      getUserInfo().then(res => {
        // console.log(res)
        state.userInfo = res
      })
    })
    const getFirstTab = (id) => {
      state.setFirstComponent = state.enmu1[id]
    }
    const getSecondTab = (id) => {
      state.setSecondComponent = state.enmu2[id]
    }
    return {
      firstDefTab,
      secondDefTab,
      state,
      getSecondTab,
      getFirstTab
    }
  },
  components: {
    user,
    msg,
    eq,
    backpack,
    practice,
    pets,
    task,
    scene,
    maps,
    shop,
    activity
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
