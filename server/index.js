function expressify (definition) {
  return async (req, res) => {
    const { args } = req.body
    const { method } = req.params

    if (!definition[method]) {
      return res.status(404).send([method, 'not implemented'].join())
    }

    const result = await definition[method](...args)
    res.send(result)
  }
}

module.exports = { expressify }
