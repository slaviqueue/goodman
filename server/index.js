function expressify (definition) {
  return async (req, res) => {
    const { method, args } = req.body

    if (!definition[method]) {
      return res.status(404).send([method, 'not implemented'].join())
    }

    const result = await definition[method](...args)
    res.send(result)
  }
}

module.exports = { expressify }
