import { describe, expect, it } from "vitest";
import ListItemFactory from "../src/scripts/modules/Data/ListItemFactory";

const exampleResults = {
  items: [
    {
      type: "video",
      title: "Example - Original (Official Music Video)",
      id: "UOfo2EbRWUk",
      url: "https://www.youtube.com/watch?v=UOfo2EbRWUk",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/UOfo2EbRWUk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAlyYRiLkpcuiHn-dfE6nEqOVhNzg",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/UOfo2EbRWUk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAlyYRiLkpcuiHn-dfE6nEqOVhNzg",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/UOfo2EbRWUk/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC7NiBmdRwJKS2Gp7YfL9XxdNdT3g",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["New", "4K"],
      author: {
        name: "Example",
        channelID: "UC736ropsqGan0ezGMQDx-Zg",
        url: "https://www.youtube.com/channel/UC736ropsqGan0ezGMQDx-Zg",
        bestAvatar: {
          url: "https://yt3.ggpht.com/_wXHXSsxs-CE-EnCxaDIl4wcDXuCq3NI_Z4N3g5mOlUfyoHkmSi-PzVvb5_Ye5XcZgAFG3WV7Q=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/_wXHXSsxs-CE-EnCxaDIl4wcDXuCq3NI_Z4N3g5mOlUfyoHkmSi-PzVvb5_Ye5XcZgAFG3WV7Q=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 6598,
      duration: "2:44",
      uploadedAt: "1 day ago",
    },
    {
      type: "video",
      title: "Example - Show Me How To Love (Official Video)",
      id: "jLTcHyuKAb0",
      url: "https://www.youtube.com/watch?v=jLTcHyuKAb0",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/jLTcHyuKAb0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA3h53AmnluMUuvXL7npFSIDizyaA",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/jLTcHyuKAb0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA3h53AmnluMUuvXL7npFSIDizyaA",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/jLTcHyuKAb0/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAGxm4xV1tL0qZv8aAtnhnqBJoIiA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: [],
      author: {
        name: "Example",
        channelID: "UC736ropsqGan0ezGMQDx-Zg",
        url: "https://www.youtube.com/channel/UC736ropsqGan0ezGMQDx-Zg",
        bestAvatar: {
          url: "https://yt3.ggpht.com/_wXHXSsxs-CE-EnCxaDIl4wcDXuCq3NI_Z4N3g5mOlUfyoHkmSi-PzVvb5_Ye5XcZgAFG3WV7Q=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/_wXHXSsxs-CE-EnCxaDIl4wcDXuCq3NI_Z4N3g5mOlUfyoHkmSi-PzVvb5_Ye5XcZgAFG3WV7Q=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 10218576,
      duration: "4:05",
      uploadedAt: "3 years ago",
    },
  ],
};

const exampleOutput = {
  UOfo2EbRWUk: {
    title: "Example - Original (Official Music Video)",
    thumbnailURL: {
      url: "https://i.ytimg.com/vi/UOfo2EbRWUk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAlyYRiLkpcuiHn-dfE6nEqOVhNzg",
      width: 720,
      height: 404,
    },
    duration: "2:44",
    id: "UOfo2EbRWUk",
    url: "https://www.youtube.com/watch?v=UOfo2EbRWUk",
    type: "video",
    isLive: false,
    isUpcoming: false,
    enabled: true,
  },
  jLTcHyuKAb0: {
    title: "Example - Show Me How To Love (Official Video)",
    thumbnailURL: {
      url: "https://i.ytimg.com/vi/jLTcHyuKAb0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA3h53AmnluMUuvXL7npFSIDizyaA",
      width: 720,
      height: 404,
    },
    duration: "4:05",
    id: "jLTcHyuKAb0",
    url: "https://www.youtube.com/watch?v=jLTcHyuKAb0",
    type: "video",
    isLive: false,
    isUpcoming: false,
    enabled: true,
  },
};

describe("ListItemFactory", () => {
  it("creates an instance", () => {
    const instance = new ListItemFactory();
    expect(instance).toBeTruthy();
  });

  it("should have a createItems method", () => {
    const instance = new ListItemFactory();
    expect(instance.createItems).toBeDefined();
  });

  it("should have a getItems method", () => {
    const instance = new ListItemFactory();
    expect(instance.getItems).toBeDefined();
  });

  it("should create proper instances of ListItem based on results", () => {
    const instance = new ListItemFactory();
    instance.createItems(exampleResults);
    const items = instance.getItems();
    expect(items).toEqual(exampleOutput);
  });

  it("should delete previous items", () => {
    const instance = new ListItemFactory();
    instance.createItems(exampleResults);
    instance.createItems({ items: [] });
    expect(instance.getItems()).toEqual({});
  });
});
