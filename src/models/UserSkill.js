class UserSkill_Filed_CN_Map extends Ability {
  damage_text = '技能伤害'
}

/**
* 用户技能字段
* author Luo
* 2020-11-10
*/
export default class UserSkill extends UserSkill_Filed_CN_Map {
  constructor(data = {}) {
    super()
    // 这里做一些数据转换和初始化
    this.damage = data.damage
  }
  damage = 0
}
