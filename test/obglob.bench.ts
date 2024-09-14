import { bench, describe } from 'vitest'
import { obglob } from '../src'

describe('Obglob benchmark', () => {
  bench('obglob', () => {
    obglob({
      a: {
        b: {
          c: 1,
          d: 2,
        },
        e: 3,
      },
    }, {
      patterns: ['**/b/**'],
    })
  })
})
