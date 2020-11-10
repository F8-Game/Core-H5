import Ability from './Ability.js'

class User_Filed_CN_Map extends Ability {
  level_text = '等级'
  exp_text = '经验'
}

/**
* 用户信息字段
* author Luo
* 2020-11-10
*/
export default class User extends User_Filed_CN_Map {
  constructor(data = {}) {
    super(data)
    // 这里做一些数据转换和初始化
    this.level = data.level
    this.exp = data.exp
  }
  level = 0
  exp = 0
}
