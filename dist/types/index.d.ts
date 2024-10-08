export interface ObjectGlobOptions {
    patterns: string[];
    delimiter?: string;
    globBy?: 'path' | 'value';
    returnAs?: 'object' | 'paths' | 'values';
    excludeMatched?: boolean;
    includeUnmatched?: boolean;
    returnFlattened?: boolean;
    callback?: (value?: unknown) => unknown;
}
declare const obglob: (value: object, options: ObjectGlobOptions) => object;
export { obglob as default, obglob };
