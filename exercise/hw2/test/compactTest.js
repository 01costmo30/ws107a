const assert = require('assert')
const compact = require('../lib/compact')

describe('compact', function () {
  it("_.compact(['a', 'b', '', false]) equalTo [ 'a', 'b' ]", function () {
    assert.deepStrictEqual(compact(['a', 'b', '', false]), [ 'a', 'b' ])
  })
  it("_.compact(['a', null, 'c', 0]) equalTo [ 'a', 'c' ]", function () {
    assert.deepStrictEqual(compact(['a', null, 'c', 0]), [ 'a', 'c' ])
  })
  it("_.compact(['a', 'b', 'c', undefined, NaN]) notEqualTo [ 'a', 'b', 'c', NaN ]", function () {
    assert.notDeepStrictEqual(compact(['a', 'b', 'c', undefined, NaN]), [ 'a', 'b', 'c', NaN ])
  })
})