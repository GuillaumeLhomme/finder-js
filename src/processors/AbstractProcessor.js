export default class AbstractProcessor {
  constructor() {
    if (this.constructor === AbstractProcessor) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  process() {
    throw new Error("Method 'process()' must be implemented.");
  }
}
