const { obglob } = require('@hackylabs/obglob')

module.exports = {
  example: (val, options) => obglob(val, options)
}