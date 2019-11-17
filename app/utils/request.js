/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
  return new Promise(resolve => {
    if (response.status === 204) {
      return resolve({
        status: response.status,
        ok: response.ok,
        json: {},
      });
    }
    return response.json().then(json =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      }),
    );
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response.json);
      })
      .catch(() => reject(new Error('Network Error')));
  });
}
