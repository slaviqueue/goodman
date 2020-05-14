function makeCallUrl (baseUrl, method) {
  return [baseUrl, method].join('/')
}

function makeCall (baseUrl, http, method, args) {
  return http.post(makeCallUrl(baseUrl, method), {
    args
  })
}

function consume (baseUrl, { http, extract }) {
  return new Proxy({}, {
    get (obj, prop) {
      return (...args) => makeCall(baseUrl, http, prop, args).then(extract)
    }
  })
}

module.exports = { consume }
