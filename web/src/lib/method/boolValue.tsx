/**
 * Takes in a bool, returns _true if true _false if false
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
