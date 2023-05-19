import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

instance.interceptors.response.use(
  (response) => {
    console.log(response.data)
    const { errno, message, data } = response.data
    if (errno === 0) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance

// export const get = (url, params = {}) => {
//   return new Promise((resolve, reject) => {
//     instance.get(url, { params }, {
//     }).then((response) => {
//       resolve(response.data)
//     }, err => {
//       reject(err)
//     })
//   })
// }

// export const post = (url, data = {}) => {
//   return new Promise((resolve, reject) => {
//     instance.post(url, data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then((response) => {
//       resolve(response.data)
//     }, err => {
//       reject(err)
//     })
//   })
// }
