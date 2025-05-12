import assert from 'node:assert';
import { describe, it } from "node:test";
import FilterArgProcessor from "../../src/processors/FilterArgProcessor.js";

describe("FilterArgProcessor", () => {
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

  describe('process', () => {

    it("should return undefined if no match", async (t) => {
      const result = FilterArgProcessor.process("bl", data);
      assert.equal(result, undefined);
    });

    it("should return the right filter", async (t) => {
      const result = FilterArgProcessor.process("a", data);
      assert.equal(result[0].name, 'Dillauti');
      assert.equal(result[0].people[0].name, 'Winifred Graham');
      assert.deepStrictEqual(result[0].people[0].animals.map(animal => animal.name), ["Anoa", "Narwhal", "Badger", "Cobra"]);
    });

    it("should return undefined if regex is empty", async (t) => {
      const result = FilterArgProcessor.process("", data);
      assert.equal(result, undefined);
    });

    it("should return the right filter with regex", async (t) => {
      const result = FilterArgProcessor.process("^[A-Z]", data);
      assert.equal(result[0].name, 'Dillauti');
      assert.equal(result[0].people[0].name, 'Winifred Graham');
      assert.deepStrictEqual(result[0].people[0].animals.map(animal => animal.name), ["Anoa", "Duck", "Narwhal", "Badger", "Cobra", "Crow"]);
    });

    it("should return the right filter with specific regex", async (t) => {
      const result = FilterArgProcessor.process("^.{4}$", data);
      assert.equal(result[0].name, 'Dillauti');
      assert.equal(result[0].people[0].name, 'Winifred Graham');
      assert.deepStrictEqual(result[0].people[0].animals.map(animal => animal.name), ["Anoa", "Duck", "Crow"]);
    });
  })
});
