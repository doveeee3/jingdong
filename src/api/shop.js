import request from '@/utils/request'

export default function shop(id) {
  return request({
    url: `/api/shop/${id}`,
    method: 'GET'
  })
}
