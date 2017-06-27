import { Loading } from 'quasar'
import md5 from 'blueimp-md5'
import firebaseApp from 'utils/firebase'
import lastfmApp from 'utils/lastfm'

const loadingManager = {
  count: 0,
  start () {
    this.count += 1
    console.log('api start', this.count)

    if (!Loading.isActive()) {
      Loading.show({
        spinner: 'audio',
        spinnerSize: 300
      })
    }
  },
  end () {
    this.count -= 1
    console.log('api end', this.count)

    if (this.count === 0) {
      Loading.hide()
    }
  }
}

const firebaseApi = {
  signIn () {
    return new Promise((resolve, reject) => {
      const provider = new firebaseApp.auth.GoogleAuthProvider()

      firebaseApp.auth().signInWithPopup(provider)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  },
  signOut () {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().signOut()
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  },
  onAuthChanged () {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => resolve(user))
    })
  },
  timestamp () {
    return new Promise((resolve, reject) => resolve(firebaseApp.database.ServerValue.TIMESTAMP))
  },
  getDB (url) {
    return new Promise((resolve, reject) => {
      firebaseApp.database().ref(url)
      .once('value')
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  },
  updateDB (updates) {
    return new Promise((resolve, reject) => {
      firebaseApp.database().ref().update(updates)
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  },
  createNewAlbumAtomic (album, onComplete) {
    const url = `/albums/${album.id}`

    return new Promise((resolve, reject) => {
      firebaseApp.database().ref(url)
      .transaction(album => {
        if (album === null) {
          const newAlbum = Object.assign({}, album)
          delete newAlbum.playCount
          return newAlbum
        }
      }, onComplete)
    })
  }
}

const lastfmApi = {
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

const handler = {
  get (target, key, receiver) {
    loadingManager.start()
    const originProperty = Reflect.get(target, key, receiver)

    return (...args) => {
      const proxiedApi = new Promise((resolve, reject) => {
        originProperty.apply(this, args).then(result => {
          resolve(result)
          loadingManager.end()
        })
        .catch(error => {
          reject(error)
          loadingManager.end()
        })
      })

      return proxiedApi
    }
  }
}

export const firebase = new Proxy(firebaseApi, handler)
export const lastfm = new Proxy(lastfmApi, handler)
