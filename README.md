# extensions
[![Build Status](https://travis-ci.org/isaacadams/extensions.svg?branch=master)](https://travis-ci.org/isaacadams/extensions)
[![Coverage Status](https://coveralls.io/repos/github/isaacadams/extensions/badge.svg)](https://coveralls.io/github/isaacadams/extensions)

helpful extensions methods for javascript objects

#### Arrays

```javascript
[ 1, 3, 5, 8, 21 ].take(3); // returns [ 1, 3, 5]
[ 1, 3, 5, 8, 21 ].takeFromEnd(2); // returns [ 8, 21 ]
[ 1, 3, 5, 8, 21 ].takeRandomly(4); // returns an array of length 4 with randomly selected items from the original array
```

#### Strings
```javascript
"".isNullOrWhitespace(); // returns true
"   ".isNullOrWhitespace(); // returns true
"hello world".isNullOrWhitespace(); // returns false
```

#### fs
```javascript
/// if the directory at the given path already exists, this function will return true
/// if the directory & subdirectories do not exist, this function will create them and return true
/// if anything goes wrong, it will return false
let result = fs.ensureDirectoryExists('./path/to/directory'); // returns true/false


```