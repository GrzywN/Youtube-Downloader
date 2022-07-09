export default class ListItem {
  constructor(result) {
    this.title = result.title;
    this.thumbnailURL = result.bestThumbnail;
    this.duration = result.duration;
    this.id = result.id;
    this.url = result.url;

    this.type = result.type;
    this.isLive = result.isLive;
    this.isUpcoming = result.isUpcoming;
    this.enabled = this.isAbleToDownload();
  }

  isAbleToDownload() {
    if (this.type == null) this.type = "video";
    return this.type === "video" && !this.isLive && !this.isUpcoming;
  }
}
