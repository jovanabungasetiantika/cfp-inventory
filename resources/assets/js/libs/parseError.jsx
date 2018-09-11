/**
 * Parse object or array of string or array of object into string.
 * @param {*} data Data can be object or array of string or array of object to be parse
 * @returns {string} String of parsed data
 */
const parseError = data => {
  let outputError = ''
  if (typeof data === 'string') {
    outputError = data
  } else if (data && typeof data.error === 'string') {
    outputError = data.error
  } else if (data && typeof data.error === 'object') {
    _.map(data.error, (val, key) => {
      outputError += key ? `${key} validation: ${val}` : `${val}`
      outputError += '\n'
    })
  }

  return outputError
}

export default parseError
