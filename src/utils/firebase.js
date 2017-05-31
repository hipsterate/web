import * as firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyADXQSzyrxchFTnesp2yzNGlwCtZvIFrM4',
  authDomain: 'hipsterate.firebaseapp.com',
  databaseURL: 'https://hipsterate.firebaseio.com',
  projectId: 'hipsterate',
  storageBucket: 'hipsterate.appspot.com',
  messagingSenderId: '391816852479'
}

firebase.initializeApp(config)

export default firebase
