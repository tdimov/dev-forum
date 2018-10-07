module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 8
  },
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true,
    }],
    "consistent-return": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "class-methods-use-this": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-plusplus": 0
  },
  "extends": [
    "airbnb-base",
    "prettier"
  ]
}