import {obglob, ObjectGlobOptions} from '@hackylabs/obglob'

export const example = (val: object, options: ObjectGlobOptions): object => obglob(val, options)