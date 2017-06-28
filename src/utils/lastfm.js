import md5 from 'blueimp-md5'
import { loadingProxyHandler } from 'utils/loading'

const lastfmApp = {
  url (method, params, json = true) {
    let queryString = ''
    for (let [key, value] of params) {
      queryString += `&${key}=${value}`
    }

    if (json) {
      queryString += '&format=json'
    }

    return `${process.env.LASTFM_API_URL}?method=${method}&api_key=${process.env.LASTFM_API_KEY}${queryString}`
  }
}

const lastfmAPI = {
  getSession (token) {
    const params = new Map()
    params.set('token', token)
    params.set('api_sig', md5(`api_key${process.env.LASTFM_API_KEY}methodauth.getSessiontoken${token}${process.env.LASTFM_API_SECRET}`))
    const url = lastfmApp.url('auth.getSession', params, false)
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  },
  getTopAlbums (lastfmUsername) {
    const params = new Map()
    params.set('user', lastfmUsername)
    params.set('period', '1month')
    const url = lastfmApp.url('user.getTopAlbums', params)

    return new Promise((resolve, reject) => {
      fetch(url)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }
}

const lastfm = new Proxy(lastfmAPI, loadingProxyHandler)
export default lastfm
