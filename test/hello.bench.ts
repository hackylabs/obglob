import { bench, describe } from 'vitest'
import { hello } from '../src'

describe('Hello benchmark', () => {
  bench('hello', () => {
    hello()
  })
})
