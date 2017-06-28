import { Loading } from 'quasar'

const loadingManager = {
  count: 0,
  start (key) {
    this.count += 1
    console.log(key, 'api start', this.count)

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

export const loadingProxyHandler = {
  get (target, key, receiver) {
    const originProperty = Reflect.get(target, key, receiver)
    if (typeof originProperty !== 'function') {
      return originProperty
    }

    loadingManager.start(key)
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
