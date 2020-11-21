import request from '@/util/request'
import game from '../util/game.js'

export function login(data) {
  return request({
    url: `/login`,
    method: 'post',
    data: data
  })
}

export async function getUserInfo() {
  return new Promise((resolve, reject) => {
    game.send('user.userInfo').then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export async function setAttrPoint(attr = { str: 1, int: 0, con: 0, vit: 0, agi: 0 }) {
  await game.send('user.attrSave', attr)
  getUserInfo()
}
