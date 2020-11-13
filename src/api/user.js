import request from '@/util/request'

export function login(data) {
  return request({
    url: `/login`,
    method: 'post',
    data: data
  })
}
