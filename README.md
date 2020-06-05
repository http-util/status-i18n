# status-i18n

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

HTTP status and message mapping, i18n supported.

## Installation

```sh
$ npm install @http-util/status-i18n
```

## API

```js
var status = require('@http-util/status-i18n');
// or 
import status from '@http-util/status-i18n';
```

### status.BROWSER_LANG

Returns a lowercase string of default browser language set by user.

### status.codes

Returns an array of all the status codes as `Integer`s.

### status[code]

Map of `code` to `status message`, in the same format as the [Node.js http module](https://nodejs.org/dist/latest/docs/api/http.html#http_http_status_codes). `undefined` for invalid `code`s. The language has been set to default `en-us`.

```js
status[404] // => 'Not Found'
status[700] // => undefined
```

### status(code, language)

Map of `code` to `status message` with specific language. The default browser language is assumed to be `en-us`.

```js
status(401, 'zh-cn') // => '无权限'
status(401, 'zh-CN') // => '无权限'
status(401, status.BROWSER_LANG) // => 'Unauthorized'
status(401) // => 'Unauthorized'
```

[npm-image]: https://img.shields.io/npm/v/@http-util/status-i18n.svg
[npm-url]: https://npmjs.org/package/@http-util/status-i18n
[node-version-image]: https://img.shields.io/node/v/@http-util/status-i18n.svg
[node-version-url]: https://www.npmjs.com/package/@http-util/status-i18n
[travis-image]: https://img.shields.io/travis/http-util/status-i18n.svg
[travis-url]: https://travis-ci.org/http-util/status-i18n
[coveralls-image]: https://img.shields.io/coveralls/http-util/status-i18n.svg
[coveralls-url]: https://coveralls.io/github/http-util/status-i18n?branch=master
[downloads-image]: https://img.shields.io/npm/dm/@http-util/status-i18n.svg
[downloads-url]: https://npmjs.org/package/@http-util/status-i18n
