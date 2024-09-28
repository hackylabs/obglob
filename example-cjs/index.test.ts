import { describe, it, beforeEach, expect } from 'vitest'

// @ts-ignore
import { example } from './index'

describe('Example', () => {
  let result: object

  beforeEach(() => {
    result = example({ a: { b: 1, c: 2 } }, { patterns: ['**/b/**'] })
  })

  it('should return an object without a.c', () => {
    expect(result).toEqual({ a: { b: 1 } })
  })
})