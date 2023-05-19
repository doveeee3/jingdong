import request from '@/utils/request'

export default function order() {
  return request({
    url: '/api/order',
    method: 'GET'
  })
}
