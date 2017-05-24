export default {
  url (method, params) {
    let queryString = ''
    for (let [key, value] of params) {
      queryString += `&${key}=${value}`
    }

    return `${process.env.LASTFM_API_URL}?method=${method}&api_key=${process.env.LASTFM_API_KEY}${queryString}`
  }
}
