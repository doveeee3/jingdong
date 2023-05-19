import request from '@/utils/request'

export default function login(data) {
  return request({
    url: '/api/user/login',
    method: 'POST',
    data
  })
}
