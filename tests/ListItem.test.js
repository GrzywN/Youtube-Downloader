import { describe, expect, it } from "vitest";
import ListItem from "../src/scripts/modules/Data/ListItem";

describe("ListItem", () => {
  it("creates an instance", () => {
    const instance = new ListItem({});
    expect(instance).toBeTruthy();
  });

  it("should have a title", () => {
    const item = new ListItem({ title: "test" });
    expect(item.title).toBe("test");
  });

  it("should have a thumbnailURL", () => {
    const item = new ListItem({ bestThumbnail: "test" });
    expect(item.thumbnailURL).toBe("test");
  });

  it("should have a duration", () => {
    const item = new ListItem({ duration: "test" });
    expect(item.duration).toBe("test");
  });

  it("should have an id", () => {
    const item = new ListItem({ id: "test" });
    expect(item.id).toBe("test");
  });

  it("should have a url", () => {
    const item = new ListItem({ url: "test" });
    expect(item.url).toBe("test");
  });

  it("should have a type", () => {
    const item = new ListItem({ type: "test" });
    expect(item.type).toBe("test");
  });

  it("should have a isLive", () => {
    const item = new ListItem({ isLive: true });
    expect(item.isLive).toBe(true);
  });

  it("should have a isUpcoming", () => {
    const item = new ListItem({ isUpcoming: true });
    expect(item.isUpcoming).toBe(true);
  });

  it("should have an enabled", () => {
    const item = new ListItem({
      type: "video",
      isLive: false,
      isUpcoming: false,
    });
    expect(item.enabled).toBe(true);
  });

  it("should have an enabled", () => {
    const item = new ListItem({
      type: "video",
      isLive: true,
      isUpcoming: false,
    });
    expect(item.enabled).toBe(false);
  });

  it("should have an enabled", () => {
    const item = new ListItem({
      type: "video",
      isLive: false,
      isUpcoming: true,
    });
    expect(item.enabled).toBe(false);
  });

  it("should have an enabled", () => {
    const item = new ListItem({
      type: "video",
      isLive: true,
      isUpcoming: true,
    });
    expect(item.enabled).toBe(false);
  });

  it("should have an enabled", () => {
    const item = new ListItem({
      type: "shelf",
      isLive: false,
      isUpcoming: false,
    });
    expect(item.enabled).toBe(false);
  });
});
