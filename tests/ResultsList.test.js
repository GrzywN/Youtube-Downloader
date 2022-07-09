import { describe, expect, it } from "vitest";
import ResultsList from "../src/scripts/modules/Data/ResultsList";

describe("ResultsList", () => {
  it("creates an instance", () => {
    const instance = new ResultsList({});
    expect(instance).toBeTruthy();
  });

  it("should update the results", () => {
    const instance = new ResultsList({});
    const list = {
      1: {
        id: "1",
        name: "test",
        value: "test",
      },
    };
    instance.update(list);
    expect(instance.getList()).toEqual(list);
  });

  it("should get the list", () => {
    const instance = new ResultsList({});
    const list = {
      1: {
        id: "1",
        name: "test",
        value: "test",
      },
    };
    instance.update(list);
    expect(instance.getList()).toEqual(list);
  });

  it("should get the value list", () => {
    const instance = new ResultsList({});
    const list = {
      1: {
        id: "1",
        name: "test",
        value: "test",
      },
    };
    instance.update(list);
    expect(instance.getValueList()).toEqual([
      { id: "1", name: "test", value: "test" },
    ]);
  });

  it("should get the item from ID", () => {
    const instance = new ResultsList({});
    const list = {
      1: {
        id: "1",
        name: "test",
        value: "test",
      },
    };
    instance.update(list);
    expect(instance.getItemFromID("1")).toEqual({
      id: "1",
      name: "test",
      value: "test",
    });
  });

  it("should get the item from ID", () => {
    const instance = new ResultsList({});
    const list = {
      1: {
        id: "1",
        name: "test",
        value: "test",
      },
    };
    instance.update(list);
    expect(instance.getItemFromID("1")).toEqual({
      id: "1",
      name: "test",
      value: "test",
    });
  });

  it("copied object should not be equal to its original", () => {
    const originalObj = {
      id: 1,
    };
    const copiedObj = ResultsList.getCopiedObject(originalObj);
    expect(originalObj === copiedObj).toEqual(false);
  });
});
