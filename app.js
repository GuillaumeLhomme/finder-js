import ComandLineArgsHandler from "./src/handlers/CommandLineArgsHandler.js";

const args = process.argv.slice(2);

const result = ComandLineArgsHandler.handleArgs(args);
if (!!result) {
  console.log(JSON.stringify(result, null, 2));
}
