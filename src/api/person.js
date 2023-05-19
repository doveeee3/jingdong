import request from '@/utils/request'

export function person() {
  return request({
    url: '/api/user/info',
    method: 'GET'
  })
}

export function getAddress() {
  return request({
    url: '/api/user/address',
    method: 'GET'
  })
}
