import * as firebaseApp from 'firebase'
import { loadingProxyHandler } from 'utils/loading'

firebaseApp.initializeApp({
  apiKey: 'AIzaSyADXQSzyrxchFTnesp2yzNGlwCtZvIFrM4',
  authDomain: 'hipsterate.firebaseapp.com',
  databaseURL: 'https://hipsterate.firebaseio.com',
  projectId: 'hipsterate',
  storageBucket: 'hipsterate.appspot.com',
  messagingSenderId: '391816852479'
})

const firebaseAPI = {
  timestamp () {
    return new Promise((resolve, reject) => resolve(firebaseApp.database.ServerValue.TIMESTAMP))
  },
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

const firebase = new Proxy(firebaseAPI, loadingProxyHandler)
export default firebase
