/**
 * calls the inputted method if hte method is callable
 * @param method
 */
const callifcallable = (method?: (...args: any[]) => void): any => {
  if (method) {
    method();
  }
};

export default callifcallable;
