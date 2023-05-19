import request from '@/utils/request'

export default function hotList() {
  return request({
    url: '/api/shop/hot-list',
    method: 'GET'
  })
}
