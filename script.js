const names = [
  "Nam",
  "Zihao",
  "Alicia",
  "Katy",
  "Ruby",
  "Yvonne",
  "Chenxi",
  "Tonghe",
  "Yangqing",
  "Yawen",
  "Zoe",
  "Yanyi",
  "Alice",
  "Daisy",
  "Katie",
  "Qinhan",
  "Jocelyn",
  "Sijie",
  "Amy",
  "Michael",
  "Yuqi",
  "Wendy",
  "Xi",
  "Zi",
];

const spinButton = document.getElementById("spinButton");
const nameDisplay = document.getElementById("nameDisplay");
const clickSound = document.getElementById("clickSound");
const finalResult = document.getElementById("finalResult");
const resultName = document.getElementById("resultName");
const historyList = document.getElementById("historyList");
const participantCount = document.getElementById("participantCount");

const pickHistory = [];
participantCount.textContent = `${names.length} participants loaded`;

function addToHistory(name) {
  pickHistory.unshift(name);
  if (pickHistory.length > 5) {
    pickHistory.pop();
  }

  historyList.innerHTML = "";
  pickHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function flashResult() {
  nameDisplay.classList.remove("flash");
  requestAnimationFrame(() => nameDisplay.classList.add("flash"));
}

function runSpinAnimation() {
  return new Promise((resolve) => {
    let index = 0;
    let totalTicks = 0;
    const maxTicks = names.length * 2;

    const tick = () => {
      nameDisplay.textContent = names[index % names.length];
      index += 1;
      totalTicks += 1;

      const progress = totalTicks / maxTicks;
      const delay = 55 + Math.floor(progress * 130);

      if (totalTicks < maxTicks) {
        setTimeout(tick, delay);
      } else {
        resolve();
      }
    };

    tick();
  });
}

spinButton.addEventListener("click", async () => {
  spinButton.disabled = true;
  finalResult.hidden = true;

  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (_err) {
    // Non-blocking if autoplay/audio policies stop playback.
  }

  await runSpinAnimation();

  const randomIndex = Math.floor(Math.random() * names.length);
  const pickedName = names[randomIndex];

  nameDisplay.textContent = pickedName;
  resultName.textContent = pickedName;
  finalResult.hidden = false;
  addToHistory(pickedName);
  flashResult();

  clickSound.pause();
  clickSound.currentTime = 0;
  spinButton.disabled = false;
});
