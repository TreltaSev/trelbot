/**
 * Takes in an _input, if the input equals the check then returns _default, else
 * it returns _input
 * @param _input
 * @param _default
 * @param _check
 */
const boolValue = (_input?: boolean, _true?: any, _false?: any): any => {
  if (_input) {
    return _true
  } else {
    return _false
  }
};

export default boolValue;
