import { flatten, unflatten } from 'safe-flat'
import micromatch from 'micromatch'

export interface ObjectGlobOptions {
  patterns: string[]
  delimiter?: string
  excludeMatched?: boolean
  includeUnmatched?: boolean
  returnFlattened?: boolean
  callback?: (value?: unknown) => unknown
}

const obglob = (value: object, options: ObjectGlobOptions): object => {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError('obglob: Value must be an object or array')
  }

  const {
    patterns,
    delimiter = '/',
    returnFlattened = false,
    includeUnmatched = false,
    excludeMatched = false,
    callback,
  } = options

  if (!patterns.length) {
    console.warn('obglob: No patterns provided, returning original value')
    return value
  }

  if (excludeMatched && !includeUnmatched) {
    console.warn('obglob: excludeMatched is true but includeUnmatched is false, returning empty object')
    return {}
  }

  const flattened = flatten(value, delimiter)
  const keys = Object.keys(flattened)
  const matchedKeys = micromatch(keys, patterns)
  const matches = Object.fromEntries(
    Object.entries(flattened)
      .map(([key, val]) => {
        if (excludeMatched && matchedKeys.includes(key)) return []
        if (!matchedKeys.includes(key)) return includeUnmatched ? [key, val] : []
        return [key, callback ? callback(val) : val]
      })
      .filter(([, val]) => val !== undefined),
  )

  if (returnFlattened) return matches
  return Array.isArray(value)
    ? Object.values(unflatten(matches, delimiter))
    : unflatten(matches, delimiter)
}

export { obglob as default, obglob }
