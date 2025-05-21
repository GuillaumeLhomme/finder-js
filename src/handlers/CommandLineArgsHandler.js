import CountArgProcessor from "../processors/CountArgProcessor.js";
import FilterArgProcessor from "../processors/FilterArgProcessor.js";
import CountryRepository from "../repositories/CountryRepository.js";

/**
 * Class to handle command line arguments
 * and process them to filter and count data.
 */
class ComandLineArgsHandler {

  argsHandler = new Map([
    ["--filter", [{ needValue: true }, FilterArgProcessor]],
    ["--count", [{ needValue: false }, CountArgProcessor]],
  ]);

  /**
   * Method to handle command line arguments
   * @param {Array} args - Array of command line arguments
   * @returns {Array} - Processed data list based on command line arguments.
   */
  handleArgs(args) {
    const parsedArgs = this._parseArgs(args);
    return this._processArgs(parsedArgs);
  }

  /**
   * Method to process command line arguments
   * and return the result.
   * @param {Map} parsedArgs - Map of parsed command line arguments
   * @returns {Array} - Processed data list based on command line arguments.
   */
  _processArgs(parsedArgs) {
    let result = CountryRepository.dataList;
    this.argsHandler.forEach((value, key) => {
      Array.from(parsedArgs.entries()).forEach(([argKey, argValue]) => {
        if (argKey === key) {
          const [options, processor] = value;
          if (options.needValue) {
            result = processor.process(argValue, result);
          } else {
            result = processor.process(result);
          }
        }
      });
    });
    return result;
  }

  /**
   * Method to parse command line arguments
   * @param {Array} args - Array of command line arguments
   * @returns {Map} - Map of parsed arguments
   */
  _parseArgs(args) {
    const parsedArgs = new Map();
    const errors = [];

    for (const rawArg of args) {
      const [key, value] = this._splitArg(rawArg);
      const handlerEntry = this.argsHandler.get(key);

      if (!handlerEntry) {
        errors.push(new Error(`arg ${key} is invalid`));
        continue;
      }

      const [processorOptions] = handlerEntry;

      if (processorOptions.needValue && value === undefined) {
        errors.push(new Error(`arg ${key} requires a value. Use it like: ${key}=value`));
        continue;
      }

      if (!processorOptions.needValue && value !== undefined) {
        errors.push(new Error(`arg ${key} should not have a value. Use it like: ${key}`));
        continue;
      }

      if (parsedArgs.has(key)) {
        errors.push(new Error(`arg ${key} is duplicated. Use it only once.`));
        continue;
      }

      parsedArgs.set(key, value);
    }

    if (errors.length > 0) {
      console.error("Command line errors:");
      errors.forEach(err => console.error(`  - ${err.message}`));
      process.exit(1);
    }

    return parsedArgs;
  }

  _splitArg(arg) {
    const index = arg.indexOf('=');
    if (index === -1) {
      return [arg, undefined];
    }
    return [arg.slice(0, index), arg.slice(index + 1)];
  }

}

export default new ComandLineArgsHandler();