import request from '@/utils/request'

export default function orderConfirm(data) {
  return request({
    url: '/api/order',
    method: 'POST',
    data
  })
}
