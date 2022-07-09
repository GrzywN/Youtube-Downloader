import { describe, expect, it } from "vitest";
import ResultsList from "../src/scripts/modules/Data/ResultsList";

describe("ResultsList", () => {
  it("creates an instance", () => {
    const instance = new ResultsList({});
    expect(instance).toBeTruthy();
  });

<<<<<<< HEAD
  it("should update the results and get the list", () => {
=======
  it("should update the results", () => {
>>>>>>> main
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

<<<<<<< HEAD
  it("should get a value list", () => {
=======
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
>>>>>>> main
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

<<<<<<< HEAD
  it("should get an item from ID", () => {
=======
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
>>>>>>> main
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

<<<<<<< HEAD
  it("should deep copy an object", () => {
=======
  it("copied object should not be equal to its original", () => {
>>>>>>> main
    const originalObj = {
      id: 1,
    };
    const copiedObj = ResultsList.getCopiedObject(originalObj);
    expect(originalObj === copiedObj).toEqual(false);
  });
});
