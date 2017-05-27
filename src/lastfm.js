export default {
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
