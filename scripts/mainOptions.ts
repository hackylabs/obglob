import { renderTable, type TableData } from './_renderTable'

const tableData: TableData = [
  {
    key: 'patterns',
    description: 'An array of glob patterns (as strings) to match key paths against. See [micromatch](https://npmjs.com/package/micromatch) for more information. An empty array will return the original value and log a warning as a helpful reminder.',
    type: 'array',
    options: '',
    default: '',
    required: 'Y',
  },
  {
    key: 'delimiter',
    description: 'The delimiter to use when flattening and unflattening the object. Glob patterns will be matched against the flattened keys. When returnFlattened is true, the delimiter will appear in the key to delimit the path to the value in the original object.',
    type: 'string',
    options: '',
    default: '/',
    required: 'N',
  },
  {
    key: 'globBy',
    description: 'When set to "path", match the keys of the object. When set to "value", match the values of the object. When set to "value", the values will be coerced to strings before matching.',
    type: 'string',
    options: 'path ￨ value',
    default: 'path',
    required: 'N',
  },
  {
    key: 'returnAs',
    description: 'When set to "object", return the matched key/value pairs as an object. When set to "values", return an array of the matched values as a flat array. When set to "paths", return an array of the matched keys as a flat array.',
    type: 'string',
    options: 'object ￨ paths ￨ values',
    default: 'object',
    required: 'N',
  },
  {
    key: 'excludeMatched',
    description: 'When true, exclude matched key/value pairs from the result. When true and includeUnmatched is false, an empty object will be returned. When true and includeUnmatched is false, an empty object will be returned and a warning will be logged as a helpful reminder.',
    type: 'boolean',
    options: '',
    default: 'false',
    required: 'N',
  },
  {
    key: 'includeUnmatched',
    description: 'When true, include unmatched key/value pairs in the result. When false and excludeMatched is true, an empty object will be returned. When false and excludeMatched is true, an empty object will be returned and a warning will be logged as a helpful reminder.',
    type: 'boolean',
    options: '',
    default: 'false',
    required: 'N',
  },
  {
    key: 'returnFlattened',
    description: 'When true, return the result as a flattened object. When false, return the result as a nested object. Uses safe-flat. When true, each key will be delimited by a forward slash (/) denoting the path to the value in the original object.',
    type: 'boolean',
    options: '',
    default: 'false',
    required: 'N',
  },
  {
    key: 'callback',
    description: 'A function to apply to the matched values. Optionally accepts the matched value as an argument.',
    type: 'function',
    options: '',
    default: '',
    required: 'N',
  },
]

export const mainOptions = renderTable(tableData)
