import request from '@/utils/request'

export default function getProduct(id, data) {
  return request({
    url: `/api/shop/${id}/products`,
    method: 'GET',
    data
  })
}
