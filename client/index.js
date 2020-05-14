function makeCall (baseUrl, http, method, args) {
  return http.post(baseUrl, {
    body: {
      method,
      args
    }
  })
}

function consume (baseUrl, { http }) {
  return new Proxy({}, {
    get (obj, prop) {
      return (...args) => makeCall(baseUrl, http, prop, args)
    }
  })
}