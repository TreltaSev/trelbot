class intervalHelper {
  /**
   * An easier method to create and use intervals, creates an interval and loops through, every loop
   * it checks a condition that you have placed that can be anything but preferably a `boolean`. if the
   * condition is met, the method you inputed will be run.
   * @param condition if condition is true
   * @param method This method will be run
   * @param ms the time between each loop
   */
  constructor(condition: any, method: (...args: any[]) => any, ms: number = 500) {
    const interval = setInterval(() => {
      if (condition) {
        method();
        clearInterval(interval);
      }
    }, ms);
  }
}

export default intervalHelper;
