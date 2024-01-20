const cache = require('memory-cache');

// Example of putting a value into the cache
const key = 'myKey';
const value = 'myValue';
const duration = 60 * 1000; // Cache duration in milliseconds (e.g., 1 minute)

cache.put(key, value, duration);

console.log(cache.get(key)); // Output: myValue