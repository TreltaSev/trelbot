/**
 * Takes in an _input, if the input equals the check then returns _default, else
 * it returns _input
 * @param _input
 * @param _default
 * @param _check
 */
const defaultValue = (_input?: any, _default?: any, _check?: any): any => {
  if (_input === _check) {
    return _default;
  }
  return _default;
};

export default defaultValue;
