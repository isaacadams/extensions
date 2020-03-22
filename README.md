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