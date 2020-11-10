/**
* 基础能力中文映射
* author Luo
* 2020-11-10
*/
class Ability_Filed_CN_Map {
  hp_text = '生命值'
  mp_text = '魔法值'
  hit_text = '命中'
  physical_damage_text = '物理伤害'
  physical_defense_text = '物理防御'
  magic_damage_text = '魔法伤害'
  magic_defense_text = '魔法防御'
  restore_damage_text = '治疗能力'
  speed_text = '速度'
  con_text = '体质'
  int_text = '魔力'
  str_text = '力量'
  vit_text = '耐力'
  agi_text = '敏捷'
  physical_crit_text = '物理暴击'
  magic_crit_text = '法术暴击'
}

/**
* 基础能力字段
* author Luo
* 2020-11-10
*/
export default class Ability_Filed extends Ability_Filed_CN_Map {
  constructor(data = {}) {
    super()
    // 这里做一些数据转换和初始化
    this.hp = data.hp
    this.mp = data.mp
    this.hit = data.hit
    this.physical_damage = data.physical_damage
    this.physical_defense = data.physical_defense
    this.magic_damage = data.magic_damage
    this.magic_defense = data.magic_defense
    this.restore_damage = data.restore_damage
    this.speed = data.speed
    this.con = data.con
    this.int = data.int
    this.str = data.str
    this.vit = data.vit
    this.agi = data.agi
    this.physical_crit = data.physical_crit
    this.magic_crit = data.magic_crit
  }
  hp = 0
  mp = 0
  hit = 0
  physical_damage = 0
  physical_defense = 0
  magic_damage = 0
  magic_defense = 0
  restore_damage = 0
  speed = 0
  con = 0
  int = 0
  str = 0
  vit = 0
  agi = 0
  physical_crit = 0
  magic_crit = 0
}
