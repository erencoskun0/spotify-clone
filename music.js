class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }
  getName() {
    return this.title + " - " + this.singer;
  }
  getImage() {
    return this.img;
  }
}
let musicList = [
  new Music("BAMBA", "Luciona", "img/sarki-1.jpg", "voice/1.mp3"),
  new Music("IMPARATOR", "Heijan & Muti", "img/sarki-2.jpg", "voice/2.mp3"),
  new Music("Mingoflolar", "Cakal", "img/sarki-3.jpg", "voice/3.mp3"),
];
