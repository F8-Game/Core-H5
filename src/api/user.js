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
  const result = await game.send('user.userInfo')
  console.log(result)
  return result
}
