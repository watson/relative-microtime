'use strict'

const assert = require('assert')
const microtime = require('./')

assert.strictEqual(typeof microtime, 'function')
assert.strictEqual(typeof microtime(), 'function')
assert(Number.isSafeInteger(microtime()()))

// assert timer() always returns a number >= to the previously returned number
{
  const timer = microtime()
  const max = 100000
  const results = new Array(max)
  let prev = timer()

  for (let i = 0; i < max; i++) {
    results[i] = timer()
  }

  for (let i = 0; i < max; i++) {
    assert(results[i] >= prev, `expects ${results[i]} >= ${prev}`)
    prev = results[i]
  }
}

// assert timer() always returns a number very close to the actual current microtime
{
  const timer = microtime()
  const realMicrotime = Date.now() * 1000
  const calculatedMicrotime = timer()
  const allowedDelta = 1000 // 1ms
  assert(realMicrotime - allowedDelta < calculatedMicrotime, `expects ${realMicrotime} - ${allowedDelta} < ${calculatedMicrotime}`)
  assert(realMicrotime + allowedDelta > calculatedMicrotime, `expects ${realMicrotime} + ${allowedDelta} > ${calculatedMicrotime}`)
}
