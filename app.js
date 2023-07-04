const detailUp = document.getElementById("detail_up");
const detailDown = document.getElementById("detail_down");
const detail = document.querySelector("#detail");
const logo = document.querySelector("#logo");
const player = new MusicPlayer(musicList);
const geri = document.querySelector(".previous");
const ileri = document.querySelector(".next");
const mix = document.querySelector(".mix");
const durum = document.getElementById("durum");
const listAktive = document.querySelector(".listAktive");
const sarkiList = document.querySelector(".sarkiList");
const kutuphane = document.querySelector(".kutuphane");
const audio = document.querySelector("audio");
const gecensure = document.querySelector("#gecen-sure");
const toplamsure = document.querySelector("#toplam-sure");
const musicBar = document.querySelector("#music-bar");
const volumeBar = document.querySelector("#volume-bar");
const volumeIcon = document.querySelector("#volume-icon");
const dongu = document.getElementById("dongu");
const ul = document.querySelector(".sarkiList");

detailUp.addEventListener("click", function () {
  detail.classList.add("active");
});
detailDown.addEventListener("click", function () {
  detail.classList.remove("active");
});

window.addEventListener("load", () => {
  let sarki = player.getMusic();
  audio.src = sarki.file;
  displayMusicList(player.musicList);
  isPlayingNow();
  document.querySelector("#musicAd").textContent = sarki.getName();
});

geri.addEventListener("click", () => {
  player.previous();
  let sarki = player.getMusic();
  for (let img of document.querySelectorAll(".controle-img")) {
    img.src = sarki.getImage();
  }
  document.querySelector("#musicAd").textContent = sarki.getName();
  audio.src = sarki.file;
  if (durum.classList == "fa-solid fa-circle-play") {
    audio.pause();
  } else {
    audio.play();
  }
});
let sarki = player.getMusic();
for (let img of document.querySelectorAll(".controle-img")) {
  img.src = sarki.getImage();
}

ileri.addEventListener("click", () => {
  player.next();
  let sarki = player.getMusic();
  for (let img of document.querySelectorAll(".controle-img")) {
    img.src = sarki.getImage();
  }
  document.querySelector("#musicAd").textContent = sarki.getName();
  audio.src = sarki.file;
  if (durum.classList == "fa-solid fa-circle-play") {
    audio.pause();
  } else {
    audio.play();
  }
});

durum.addEventListener("click", () => {
  if (durum.classList == "fa-solid fa-circle-play") {
    durum.classList = "fa-solid fa-circle-pause";
    audio.play();
  } else {
    durum.classList = "fa-solid fa-circle-play";
    audio.pause();
  }
});

let randomBg = Math.floor(Math.random() * 10) + 1;
document.querySelector("#music-page img").src = `img/bg-${randomBg}.jpg`;

kutuphane.addEventListener("click", () => {
  if (listAktive.classList == "fa-solid fa-angle-down listAktive") {
    listAktive.classList = "fa-solid fa-angle-up listAktive";
    sarkiList.classList.add("active");
  } else {
    listAktive.classList = "fa-solid fa-angle-down listAktive";
    sarkiList.classList.remove("active");
  }
});

const calculateTime = (seconds) => {
  let dakika = Math.floor(seconds / 60);
  let saniye = Math.floor(seconds % 60);
  if (dakika < 10) {
    dakika = "0" + dakika;
  } else {
    dakika = dakika;
  }
  if (saniye < 10) {
    saniye = "0" + saniye;
  } else {
    dakika = dakika;
  }
  const sonuc = `${dakika}:${saniye}`;
  return sonuc;
};

audio.addEventListener("loadedmetadata", () => {
  toplamsure.textContent = calculateTime(audio.duration);
  musicBar.max = Math.floor(audio.duration);
});

dongu.addEventListener("click", () => {
  console.log("selamm");
  if (dongu.classList == "fa-solid fa-repeat bute dongu") {
    dongu.classList.remove("dongu");
  } else {
    dongu.classList.add("dongu");
  }
});

audio.addEventListener("timeupdate", () => {
  musicBar.value = Math.floor(audio.currentTime);
  gecensure.textContent = calculateTime(musicBar.value);

  if (musicBar.value == Math.floor(audio.duration)) {
    if (dongu.classList == "fa-solid fa-repeat bute dongu") {
      musicBar.value = 0;
      audio.currentTime = 0;
    } else {
      player.next();
      let sarki = player.getMusic();
      for (let img of document.querySelectorAll(".controle-img")) {
        img.src = sarki.getImage();
      }
      document.querySelector("#musicAd").textContent = sarki.getName();
      audio.src = sarki.file;
      if (durum.classList == "fa-solid fa-circle-play") {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }
});

musicBar.addEventListener("input", () => {
  gecensure.textContent = calculateTime(musicBar.value);
  audio.currentTime = musicBar.value;
});

volumeBar.addEventListener("input", (e) => {
  const volumem = e.target.value / 100;
  audio.volume = volumem;
  if (e.target.value == 0) {
    volumeIcon.classList = "fa-solid fa-volume-xmark";
  } else {
    volumeIcon.classList = "fa-solid fa-volume-high";
  }
});

volumeIcon.addEventListener("click", () => {
  if (volumeIcon.classList == "fa-solid fa-volume-high") {
    volumeIcon.classList = "fa-solid fa-volume-xmark";
    audio.volume = 0;
    volumeBar.value = 0;
  } else {
    volumeIcon.classList = "fa-solid fa-volume-high";
    audio.volume = 1;
    volumeBar.value = 100;
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `<li li-index='${i}' onclick="selectedMusic(this)"
                  class="sarki">${list[i].getName()}</li>
                 <audio> class="music-${i}" src="${list[i].file}"></audio>`;
    ul.insertAdjacentHTML("beforeend", liTag);
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  let sarki = player.getMusic();
  for (let img of document.querySelectorAll(".controle-img")) {
    img.src = sarki.getImage();
  }
  document.querySelector("#musicAd").textContent = sarki.getName();
  audio.src = sarki.file;
  durum.classList = "fa-solid fa-circle-pause";
  audio.play();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("active")) {
      li.classList.remove("active");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("active");
    }
  }
};
