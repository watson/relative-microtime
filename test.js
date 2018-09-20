'use strict'

const assert = require('assert')
const microtime = require('./')

// assert microtime() returns a safe integer
assert(Number.isSafeInteger(microtime()))

// assert microtime() always returns a number >= to the previously returned number
{
  const max = 100000
  const results = new Array(max)
  let prev = microtime()

  for (let i = 0; i < max; i++) {
    results[i] = microtime()
  }

  for (let i = 0; i < max; i++) {
    assert(results[i] >= prev, `expects ${results[i]} >= ${prev}`)
    prev = results[i]
  }
}

// assert microtime() always returns a number very close to the actual current microtime
{
  const realMicrotime = Date.now() * 1000
  const calculatedMicrotime = microtime()
  const allowedDelta = 1000 // 1ms
  assert(realMicrotime - allowedDelta < calculatedMicrotime, `expects ${realMicrotime} - ${allowedDelta} < ${calculatedMicrotime}`)
  assert(realMicrotime + allowedDelta > calculatedMicrotime, `expects ${realMicrotime} + ${allowedDelta} > ${calculatedMicrotime}`)
}
