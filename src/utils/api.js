import { Loading } from 'quasar'
import firebaseApp from 'utils/firebase'

const loadingManager = {
  count: 0,
  start () {
    this.count += 1

    if (!Loading.isActive()) {
      Loading.show({
        spinner: 'audio',
        spinnerSize: 300
      })
    }
  },
  end () {
    this.count -= 1

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
  }
}

const handler = {
  get (target, key, receiver) {
    loadingManager.start()

    const proxiedApi = new Promise((resolve, reject) => {
      Reflect.get(target, key, receiver)()
      .then(result => {
        resolve(result)
        loadingManager.end()
      })
      .catch(error => {
        reject(error)
        loadingManager.end()
      })
    })

    return () => proxiedApi
  }
}

export const firebase = new Proxy(firebaseApi, handler)