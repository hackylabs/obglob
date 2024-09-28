import { obglob } from '@hackylabs/obglob';
obglob({ a: { b: 1, c: 2 } }, { patterns: ['**/b/**'] });
