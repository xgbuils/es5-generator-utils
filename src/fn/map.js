const baseMap = require('../core/baseMap')

module.exports = function map (iterable, cb) {
    return this(baseMap(iterable, cb))
}
