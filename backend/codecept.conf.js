
/** @type {CodeceptJS.MainConfig} */
exports.config = {
    tests: './tests/*.js',
    output: './output',
    helpers: {
      REST: {
        endpoint: 'http://localhost:8080',
        defaultHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },
      JSONResponse: {}
    },
    name: 'backend'
};