import { describe, expect, it } from "vitest";
import QueueList from "../src/scripts/modules/Data/QueueList";

describe("QueueList", () => {
  it("isOnQueue: should be a valid boolean value", () => {
    const queueList = new QueueList();
    const item = { id: "id" };
    queueList.addItem(item);
    expect(queueList.isOnQueue(item)).toBe(true);
  });

  it("isOnQueue: should be a valid boolean value", () => {
    const queueList = new QueueList();
    const item = { id: "id" };
    queueList.addItem(item);
    const notExistingItem = { id: "notExistingId" };
    expect(queueList.isOnQueue(notExistingItem)).toBe(false);
  });

  it("getItemFromID: should be an item", () => {
    const queueList = new QueueList();
    const item = { id: "id" };
    queueList.addItem(item);
    expect(queueList.getItemFromID("id")).toStrictEqual(item);
  });

  it("removeItem: an item should not be on the list", () => {
    const queueList = new QueueList();
    const item = { id: "id" };
    queueList.addItem(item);
    queueList.removeItem(item);
    expect(queueList.isOnQueue(item)).toBe(false);
  });

  it("getList: an item should be on the list", () => {
    const queueList = new QueueList();
    const item = { id: "id" };
    queueList.addItem(item);
    expect(queueList.getList()).toEqual({ id: item });
  });

  it("getValueList: should be an array with the item", () => {
    const queueList = new QueueList();
    const item = { id: "id" };
    queueList.addItem(item);
    expect(queueList.getValueList()).toEqual([item]);
  });
});
