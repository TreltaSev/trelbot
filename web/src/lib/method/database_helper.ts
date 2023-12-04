class database_helper {
  /**
   * Updates a object using a sequence as the pointer.
   * @param mutable_object Object which will be configured and updated
   * @param sequence Sequence of keys separated by "."
   * @param value the value of the rear_key
   * @returns
   */
  public static populate(mutable_object: any, sequence: string, value: any): any {
    const individual_keys = this.to_array(sequence);
    let current_object: any = mutable_object;
    for (let index = 0; index < individual_keys.length - 1; index++) {
      const current_key = individual_keys[index];
      if (!(current_key in current_object)) {
        current_object[current_key] = {};
      }
      current_object = current_object[current_key];
    }
    const rear_key = individual_keys[individual_keys.length - 1];
    current_object[rear_key] = value;
    return mutable_object;
  }

  /**
   * Converts an array of string into a sequence string
   * @param array Array of strings
   * @returns
   */
  public static to_sequence(array: string[]): string {
    return array.join(".");
  }

  /**
   * Converts a sequence string into a string array.
   * @param sequence sequence of strings separated by "."
   * @returns
   */
  public static to_array(sequence: string): string[] {
    return sequence.split(".");
  }
}

export default database_helper;
