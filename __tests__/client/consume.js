/* global test expect */

const { consume } = require('../../client')

test('given a baseUrl and config creates an access object', () => {
  expect(() => consume('', {})).not.toThrow()
})

test('makes a http post call when method is called', async () => {
  const http = {
    post: () => Promise.resolve('hello')
  }

  const api = consume('', { http })

  expect(() => api.call()).not.toThrow()
  await api.call().then((res) => expect(res).toEqual('hello'))
})
