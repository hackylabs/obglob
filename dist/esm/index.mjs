import { flatten, unflatten } from 'safe-flat';
import micromatch from 'micromatch';
const obglob = (value, options) => {
    if (typeof value !== 'object' || value === null) {
        throw new TypeError('obglob: Value must be an object or array');
    }
    const { patterns, delimiter = '/', globBy = 'path', returnAs = 'object', returnFlattened = false, includeUnmatched = false, excludeMatched = false, callback, } = options;
    if (!patterns.length) {
        console.warn('obglob: No patterns provided, returning original value');
        return value;
    }
    if (excludeMatched && !includeUnmatched) {
        console.warn('obglob: excludeMatched is true but includeUnmatched is false, returning empty object');
        return {};
    }
    const flattened = flatten(value, delimiter);
    const subjects = globBy === 'path'
        ? Object.keys(flattened)
        : Object.values(flattened).map(String);
    const matched = micromatch(subjects, patterns);
    const matches = Object.fromEntries(Object.entries(flattened)
        .map(([key, val]) => {
        const subject = globBy === 'path' ? key : String(val);
        if (excludeMatched && matched.includes(subject))
            return [];
        if (!matched.includes(subject))
            return includeUnmatched ? [key, val] : [];
        return [key, callback ? callback(val) : val];
    })
        .filter(([, val]) => val !== undefined));
    if (returnFlattened || returnAs !== 'object') {
        if (returnAs === 'values')
            return Object.values(matches);
        if (returnAs === 'paths')
            return Object.keys(matches);
        return matches;
    }
    return Array.isArray(value)
        ? Object.values(unflatten(matches, delimiter))
        : unflatten(matches, delimiter);
};
export { obglob as default, obglob };
