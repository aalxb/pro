import axios from 'axios'

let BASE_URL = '';
let IMG_URL = '';
if (process.env.NODE_ENV == 'development') {
	BASE_URL = '/apis';
	IMG_URL = '';
} else if (process.env.NODE_ENV === 'production') {
	BASE_URL = '/';
	IMG_URL = '/znclientweb';
}

export {BASE_URL, IMG_URL}

let http = axios.create({
  baseURL:'/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

axios.interceptors.response.use(res => {
	return res.data
})

function apiAxios (method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
