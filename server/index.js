function expressify (definition) {
  return async (req, res) => {
    const { args } = req.body
    const { method } = req.params

    if (!definition[method]) {
      return res.status(404).send([method, 'not implemented'].join())
    }

    return Promise.resolve()
      .then(() => definition[method](...args))
      .then(res.send)
      .catch((error) => res.status(500).json(error))
  }
}

module.exports = { expressify }
