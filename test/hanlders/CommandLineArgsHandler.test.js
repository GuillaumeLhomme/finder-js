import assert from 'node:assert';
import { describe, it } from "node:test";
import CommandLineArgsHandler from '../../src/handlers/CommandLineArgsHandler.js';
import CountArgProcessor from '../../src/processors/CountArgProcessor.js';
import FilterArgProcessor from '../../src/processors/FilterArgProcessor.js';

describe("CommandLineArgsHandler", () => {
    describe("parseArgs", () => {
        it("should parse command line arguments correctly", () => {
            const parsedArgs = CommandLineArgsHandler._parseArgs(["--filter=abc", "--count"]);
            assert.deepStrictEqual(parsedArgs, new Map([["--filter", "abc"], ["--count", undefined]]));
        });
        it("should not parse unknown args", (t) => {
            const processSpy = t.mock.method(process, 'exit', () => { });
            CommandLineArgsHandler._parseArgs(["--unknown=abc", "--count"]);
            assert.equal(processSpy.mock.calls.length, 1);
            assert.equal(processSpy.mock.calls[0].arguments[0], 1);
        });
    });
    describe("processArgs", () => {
        it("should process parseArgs correctly", (t) => {
            const parsedArgs = new Map([["--filter", "abc"], ["--count", undefined]]);
            const filterSpy = t.mock.method(FilterArgProcessor, 'process', () => { });
            const countSpy = t.mock.method(CountArgProcessor, 'process', () => { });
            CommandLineArgsHandler._processArgs(parsedArgs);
            assert.equal(filterSpy.mock.calls.length, 1);
            assert.equal(countSpy.mock.calls.length, 1);
            filterSpy.mock.restore();
            countSpy.mock.restore();
        });
        it("should process only count arg", (t) => {
            const parsedArgs = new Map([["--count", undefined]]);
            const filterSpy = t.mock.method(FilterArgProcessor, 'process', () => { });
            const countSpy = t.mock.method(CountArgProcessor, 'process', () => { });
            CommandLineArgsHandler._processArgs(parsedArgs);
            assert.equal(filterSpy.mock.calls.length, 0);
            assert.equal(countSpy.mock.calls.length, 1);
            filterSpy.mock.restore();
            countSpy.mock.restore();
        });
    });
    describe("handleArgs", () => {
        it("should handle command line arguments correctly", (t) => {
            const parseSpy = t.mock.method(CommandLineArgsHandler, '_parseArgs', () => new Map([["--filter", "abc"], ["--count", undefined]]));
            const processSpy = t.mock.method(CommandLineArgsHandler, '_processArgs', () => { });
            CommandLineArgsHandler.handleArgs(["--filter=abc", "--count"]);
            assert.equal(processSpy.mock.calls.length, 1);
            assert.deepEqual(parseSpy.mock.calls[0].arguments, [["--filter=abc", "--count"]]);
            assert.equal(processSpy.mock.calls.length, 1);
            assert.deepEqual(processSpy.mock.calls[0].arguments, [new Map([["--filter", "abc"], ["--count", undefined]])]);
            parseSpy.mock.restore();
            processSpy.mock.restore();
        });
    });
    describe('_splitArg', () => {
        it("should split arg correctly", () => {
            const result = CommandLineArgsHandler._splitArg("--filter=abc");
            assert.deepStrictEqual(result, ["--filter", "abc"]);
        });
        it("should handle args without value", () => {
            const result = CommandLineArgsHandler._splitArg("--count");
            assert.deepStrictEqual(result, ["--count", undefined]);
        });
    });
});
