import Ability from './Ability.js'

class Monster_Filed_CN_Map extends Ability {
  level_text = '等级'
  map_text = '出没地图'
  skills_text = '技能'
}

/**
* 怪物信息字段
* author Luo
* 2020-11-10
*/
export default class Monster extends Monster_Filed_CN_Map {
  constructor(data = {}) {
    super(data)
    // 这里做一些数据转换和初始化
    this.level = data.level
    this.map = data.map
    this.skills = data.skills
  }
  level = 0
  map = -1
  skills = []
}
