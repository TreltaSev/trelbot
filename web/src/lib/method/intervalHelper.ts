class intervalHelper {
  /**
   * An easier method to create and use intervals, creates an interval and loops through, every loop
   * it checks a condition that you have placed that can be anything but preferably a `boolean`. if the
   * condition is met, the method you inputted will be run.
   * @param condition if condition is true
   * @param method This method will be run
   * @param interval the interval that will be cleared whenever the condition is true
   */
  constructor(condition: any, method: (...args: any[]) => any, interval?: NodeJS.Timeout) {
    if (condition) {
      method();
      if (interval) {
        clearInterval(interval);
      }
    }
  }
}

export default intervalHelper;
