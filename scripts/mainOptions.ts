import { renderTable, type TableData } from './_renderTable'

const tableData: TableData = [
  {
    key: 'patterns',
    description: 'An array of glob patterns (as strings) to match key paths against. See [micromatch](https://npmjs.com/package/micromatch) for more information. An empty array will return the original value and log a warning as a helpful reminder.',
    type: 'array',
    default: '',
    required: 'Y',
  },
  {
    key: 'delimiter',
    description: 'The delimiter to use when flattening and unflattening the object. Glob patterns will be matched against the flattened keys. When returnFlattened is true, the delimiter will appear in the key to delimit the path to the value in the original object.',
    type: 'string',
    default: '/',
    required: 'N',
  },
  {
    key: 'excludeMatched',
    description: 'When true, exclude matched key/value pairs from the result. When true and includeUnmatched is false, an empty object will be returned. When true and includeUnmatched is false, an empty object will be returned and a warning will be logged as a helpful reminder.',
    type: 'boolean',
    default: 'false',
    required: 'N',
  },
  {
    key: 'includeUnmatched',
    description: 'When true, include unmatched key/value pairs in the result. When false and excludeMatched is true, an empty object will be returned. When false and excludeMatched is true, an empty object will be returned and a warning will be logged as a helpful reminder.',
    type: 'boolean',
    default: 'false',
    required: 'N',
  },
  {
    key: 'returnFlattened',
    description: 'When true, return the result as a flattened object. When false, return the result as a nested object. Uses safe-flat. When true, each key will be delimited by a forward slash (/) denoting the path to the value in the original object.',
    type: 'boolean',
    default: 'false',
    required: 'N',
  },
  {
    key: 'callback',
    description: 'A function to apply to the matched values. Optionally accepts the matched value as an argument.',
    type: 'function',
    default: '',
    required: 'N',
  },
]

export const mainOptions = renderTable(tableData)
