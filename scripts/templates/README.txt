# Obglob

[![npm version](https://badge.fury.io/js/@hackylabs%2Fobglob.svg)](https://badge.fury.io/js/@hackylabs%2Fobglob)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hackylabs/obglob/blob/main/LICENSE)

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

<--MAIN_OPTIONS-->