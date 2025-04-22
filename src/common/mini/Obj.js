export function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        const fullKey = parentKey ? `${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], fullKey, result);
        } else {
            result[fullKey] = obj[key];
        }
    }
    return result;
}
