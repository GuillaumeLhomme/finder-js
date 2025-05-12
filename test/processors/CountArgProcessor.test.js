import assert from 'node:assert';
import { describe, it } from "node:test";
import CountArgProcessor from "../../src/processors/CountArgProcessor.js";

const data = [{
  name: 'Dillauti',
  people:
    [{
      name: 'Winifred Graham',
      animals:
        [{ name: 'Anoa' },
        { name: 'Duck' },
        { name: 'Narwhal' },
        { name: 'Badger' },
        { name: 'Cobra' },
        { name: 'Crow' }]
    }]
}];

describe("CountArgProcessor", () => {
  describe('process', () => {
    it("should return the right count", async (t) => {
      const result = CountArgProcessor.process(data);
      assert.equal(result[0].name, 'Dillauti [1]');
      assert.equal(result[0].people[0].name, 'Winifred Graham [6]');
    });
    it("should return undefined if empty", async (t) => {
      const result = CountArgProcessor.process([]);
      assert.equal(result, undefined);
    });
  });
})