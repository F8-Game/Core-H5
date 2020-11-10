import Ability from './Ability.js'

class Equipment_Filed_CN_Map extends Ability {
  usage_level_text = '穿戴等级'
  map_text = '掉落地图'
  skills_text = '附带技能'
}

/**
* 装备信息字段
* author Luo
* 2020-11-10
*/
export default class Equipment extends Equipment_Filed_CN_Map {
  constructor(data = {}) {
    super(data)
    // 这里做一些数据转换和初始化
    this.level = data.level
    this.map = data.map
    this.skills = data.skills
  }
  usage_level_text = 0
  map = -1
  skills = []
}
