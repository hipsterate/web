import xml2js from 'xml2js'

export default {
  parse (text) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(text, (err, result) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(result)
        }
      })
    })
  }
}
