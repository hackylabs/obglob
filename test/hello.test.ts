import { describe, expect, it } from 'vitest'
import { hello } from '../src'

describe('Hello', () => {
  it('should say Hello, world!', () => {
    expect(hello()).toEqual('Hello, world!')
  })
})
