import {
  describe, it, vi, beforeEach, afterEach, expect,
} from 'vitest'
import safeFlat from 'safe-flat'
import { obglob } from '../src'

const value = { a: { b: 1 }, c: 2 }

describe('Obglob', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn')
    vi.spyOn(safeFlat, 'unflatten')
    vi.spyOn(safeFlat, 'flatten')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  describe('code coverage', () => {
    describe('when patterns is empty', () => {
      it('should return the original value', () => {
        const result = obglob(value, { patterns: [] })
        expect(result).toEqual(value)
      })

      it('should log a warning', () => {
        obglob(value, { patterns: [] })
        expect(console.warn).toHaveBeenCalledWith('obglob: No patterns provided, returning original value')
      })

      it('should should not call flatten', () => {
        obglob(value, { patterns: [] })
        expect(safeFlat.flatten).not.toHaveBeenCalled()
      })

      it('should should not call unflatten', () => {
        obglob(value, { patterns: [] })
        expect(safeFlat.unflatten).not.toHaveBeenCalled()
      })
    })

    describe('when patterns is not empty', () => {
      describe('when other options are not set', () => {
        it('should return the matched keys', () => {
          const result = obglob(value, { patterns: ['a/b'] })
          expect(result).toEqual({ a: { b: 1 } })
        })
      })

      describe('when excludeMatched is true', () => {
        it('should return an empty object', () => {
          const result = obglob(value, { patterns: ['a/b'], excludeMatched: true })
          expect(result).toEqual({})
        })

        it('should log a warning', () => {
          obglob(value, { patterns: ['a/b'], excludeMatched: true })
          expect(console.warn).toHaveBeenCalledWith('obglob: excludeMatched is true but includeUnmatched is false, returning empty object')
        })
      })

      describe('when includeUnmatched is true', () => {
        it('should return the unmatched keys', () => {
          const result = obglob(value, { patterns: ['a/b'], includeUnmatched: true })
          expect(result).toEqual(value)
        })
      })

      describe('when callback is set', () => {
        it('should return the matched keys with the callback applied', () => {
          const result = obglob(value, {
            patterns: ['a/b'],
            callback: (val) => (typeof val === 'number' ? val * 2 : val),
          })
          expect(result).toEqual({ a: { b: 2 } })
        })
      })

      describe('when includeUnmatched is true and excludeMatched is true', () => {
        it('should return the unmatched keys', () => {
          const result = obglob(value, { patterns: ['a/b'], includeUnmatched: true, excludeMatched: true })
          expect(result).toEqual({ c: 2 })
        })
      })

      describe('when returnFlattened is true', () => {
        it('should return the matched keys flattened', () => {
          const result = obglob(value, { patterns: ['a/b'], returnFlattened: true })
          expect(result).toEqual({ 'a/b': 1 })
        })
      })

      describe('when delimiter is set', () => {
        it('should return the matched keys with the delimiter', () => {
          const result = obglob(value, { patterns: ['a.b'], delimiter: '.' })
          expect(result).toEqual({ a: { b: 1 } })
        })
      })

      describe('when globBy is set to value', () => {
        it('should return the matches by matching values', () => {
          const result = obglob(value, { patterns: ['1'], globBy: 'value' })
          expect(result).toEqual({ a: { b: 1 } })
        })
      })

      describe('when returnAs is set...', () => {
        describe('to values', () => {
          it('should return the matched values', () => {
            const result = obglob(value, { patterns: ['a/b'], returnAs: 'values' })
            expect(result).toEqual([1])
          })
        })

        describe('to paths', () => {
          it('should return the matched paths', () => {
            const result = obglob(value, { patterns: ['a/b'], returnAs: 'paths' })
            expect(result).toEqual(['a/b'])
          })
        })

        describe('to object', () => {
          it('should return the matches as an object', () => {
            const result = obglob(value, { patterns: ['a/b'], returnAs: 'object' })
            expect(result).toEqual({ a: { b: 1 } })
          })
        })
      })

      describe('when the value is an array', () => {
        it('should return the matched keys as an array', () => {
          const result = obglob([value, { d: 3 }], { patterns: ['*/a/b'] })
          expect(result).toEqual([{ a: { b: 1 } }])
        })
      })

      describe('when the value is not an object', () => {
        it('should throw an error', () => {
          // @ts-expect-error Testing invalid input
          expect(() => obglob('invalid', { patterns: ['**'] })).toThrow('obglob: Value must be an object or array')
        })
      })

      describe('when the value is null', () => {
        it('should throw an error', () => {
          // @ts-expect-error Testing invalid input
          expect(() => obglob(null, { patterns: ['**'] })).toThrow('obglob: Value must be an object or array')
        })
      })
    })
  })
})
