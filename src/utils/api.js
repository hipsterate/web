import { Loading } from 'quasar'
import firebaseApp from 'utils/firebase'

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
  getFromDB (url) {
    return new Promise((resolve, reject) => {
      firebaseApp.database().ref(url)
      .once('value')
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
