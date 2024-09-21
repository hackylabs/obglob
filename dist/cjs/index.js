"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obglob = exports.default = void 0;
const safe_flat_1 = require("safe-flat");
const micromatch_1 = __importDefault(require("micromatch"));
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
    const flattened = (0, safe_flat_1.flatten)(value, delimiter);
    const subjects = globBy === 'path'
        ? Object.keys(flattened)
        : Object.values(flattened).map(String);
    const matched = (0, micromatch_1.default)(subjects, patterns);
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
        ? Object.values((0, safe_flat_1.unflatten)(matches, delimiter))
        : (0, safe_flat_1.unflatten)(matches, delimiter);
};
exports.default = obglob;
exports.obglob = obglob;
