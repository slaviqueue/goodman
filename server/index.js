function expressify (definition) {
  return (req, res) => {
    const { method, args } = req.body

    if (!definition[method]) {
      return res.status(404).send([method, 'not implemented'].join())
    }

    definition[method](...args).then(res.send)
  }
}

module.exports = { expressify }
