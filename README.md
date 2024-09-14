# Obglob

[![npm version](https://badge.fury.io/js/@hackylabs%2Fdeep-redact.svg)](https://badge.fury.io/js/@hackylabs%2Fdeep-redact)

Obglob is a library that allows you to extract, remove or modify values from an object using glob patterns to match key
paths.

Uses safe-flat under the hood to flatten the object/array, while transforming circular references and other support
values, before globbing over the flattened object/array. Optionally, you can also use the `returnFlattened` option to
return the flattened result instead of unflattening it.

## Installation

```bash
npm install @hackylabs/obglob
```

## Usage

```typescript
// ./src/example.ts
import {obglob} from '@hackylabs/obglob'; // If you're using CommonJS, import with require('@hackylabs/obglob') instead. Both CommonJS and ESM support named and default imports.

// Glob over an object
const obj = {
  a: {
    foo: 'bar',
  },
  b: {
    bing: 'bong',
  },
}

const objResults = obglob(obj, { patterns: ['*/foo'] })
// { a: { foo: 'bar' } }

// Glob over an array
const arr = [
  {
    a: [
      'foo',
      'bar',
    ],
  },
  {
    d: [
      'bing',
      'bong',
    ],
  },
]

const arrResults = obglob(arr, { patterns: ['**/a/*'] })
// [ { a: [ 'foo', 'bar' ] } ]
```

### Main Options

| key | description | type | default | required |
| --- | --- | --- | --- | --- |
| patterns | An array of glob patterns (as strings) to match key paths against. See [micromatch](https://npmjs.com/package/micromatch) for more information. An empty array will return the original value and log a warning as a helpful reminder. | array |  | Y |
| delimiter | The delimiter to use when flattening and unflattening the object. Glob patterns will be matched against the flattened keys. When returnFlattened is true, the delimiter will appear in the key to delimit the path to the value in the original object. | string | / | N |
| excludeMatched | When true, exclude matched key/value pairs from the result. When true and includeUnmatched is false, an empty object will be returned. When true and includeUnmatched is false, an empty object will be returned and a warning will be logged as a helpful reminder. | boolean | false | N |
| includeUnmatched | When true, include unmatched key/value pairs in the result. When false and excludeMatched is true, an empty object will be returned. When false and excludeMatched is true, an empty object will be returned and a warning will be logged as a helpful reminder. | boolean | false | N |
| returnFlattened | When true, return the result as a flattened object. When false, return the result as a nested object. Uses safe-flat. When true, each key will be delimited by a forward slash (/) denoting the path to the value in the original object. | boolean | false | N |
| callback | A function to apply to the matched values. Optionally accepts the matched value as an argument. | function |  | N |