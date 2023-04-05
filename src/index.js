const keys = [...document.querySelectorAll(".key")];
const KEYS = { a: 1, s: 2, e: 3, d: 4, r: 5, f: 6, g: 7 };

for (let i = 0; i < 7; i++) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "audio";
  link.href = `sounds/tu${i + 1}.mp3`;
  document.head.appendChild(link);
}

const play = (note) => {
  const sound = new Audio(`sounds/tu${note}.mp3`);
  sound.play();
  enableFeedback();
};

const enableFeedback = (reset = false) => {
  const scale = reset ? 1 : 1 + Math.random() * 0.2;
  const rotate = reset ? 0 : -4 + Math.floor(Math.random() * 8);
  document.body.style.setProperty("--scale", scale);
  document.body.style.setProperty("--rotate", rotate + "deg");
};

keys.forEach(key => {
  key.addEventListener("mousedown", () => play(key.dataset.note));
  key.addEventListener("mouseup", () => enableFeedback(true));
});

document.addEventListener("keydown", (ev) => {
  const { key } = ev;
  play(KEYS[key]);
  keys[KEYS[key] - 1].classList.add("pressed");
});

document.addEventListener("keyup", (ev) => {
  const { key } = ev;
  keys[KEYS[key] - 1].classList.remove("pressed");
  enableFeedback(true);
});
