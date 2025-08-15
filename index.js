const selectAlgorithm = document.getElementById("selectAlgorithm");
const numbersBars = document.getElementById("numbersBars");
const generateBtn = document.getElementById("generateBtn");
const solveBtn = document.getElementById("solveBtn");
const resetBtn = document.getElementById("resetBtn");
const customArrayInput = document.getElementById("customArray");
const setCustomBtn = document.getElementById("setCustomBtn");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const stage = document.getElementById("stage");
const doneMessage = document.getElementById("doneMessage");

const timeComplexity = document.getElementById("timeComplexity");
const spaceComplexity = document.getElementById("spaceComplexity");
const bestAlgorithm = document.getElementById("bestAlgorithm");

let bars = [];
let speed = +speedSlider.value;

const complexities = {
  bubbleSort: { time: "O(n²)", space: "O(1)" },
  selectionSort: { time: "O(n²)", space: "O(1)" },
  quickSort: { time: "O(n log n)", space: "O(log n)" },
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateBars(array) {
  stage.innerHTML = "";
  bars = [];

  array.forEach(val => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val}px`;
    bar.textContent = val;
    stage.appendChild(bar);
    bars.push(bar);
  });
}

function getHeights() {
  return bars.map(bar => parseInt(bar.style.height));
}

function swap(i, j) {
  const temp = bars[i].style.height;
  const tempText = bars[i].textContent;
  bars[i].style.height = bars[j].style.height;
  bars[i].textContent = bars[j].textContent;
  bars[j].style.height = temp;
  bars[j].textContent = tempText;
}

async function bubbleSort() {
  const n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].classList.add("activate");
      bars[j + 1].classList.add("activate");

      await sleep(speed);

      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        swap(j, j + 1);
      }

      bars[j].classList.remove("activate");
      bars[j + 1].classList.remove("activate");
    }
    bars[n - i - 1].classList.add("sorted");
  }
  bars[0].classList.add("sorted");
}

async function selectionSort() {
  const n = bars.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    bars[minIndex].classList.add("activate");
    for (let j = i + 1; j < n; j++) {
      bars[j].classList.add("activate");
      await sleep(speed);

      if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
        bars[minIndex].classList.remove("activate");
        minIndex = j;
        bars[minIndex].classList.add("activate");
      } else {
        bars[j].classList.remove("activate");
      }
    }
    if (minIndex !== i) {
      swap(i, minIndex);
    }
    bars[minIndex].classList.remove("activate");
    bars[i].classList.add("sorted");
  }
}

async function quickSort(low = 0, high = bars.length - 1) {
  if (low < high) {
    const pivotIndex = await partition(low, high);
    await quickSort(low, pivotIndex - 1);
    await quickSort(pivotIndex + 1, high);
  } else if (low === high) {
    bars[low].classList.add("sorted");
  }
}

async function partition(low, high) {
  const pivot = parseInt(bars[high].style.height);
  let i = low - 1;

  bars[high].classList.add("activate");

  for (let j = low; j < high; j++) {
    bars[j].classList.add("activate");
    await sleep(speed);
    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      swap(i, j);
    }
    bars[j].classList.remove("activate");
  }

  swap(i + 1, high);
  bars[high].classList.remove("activate");
  bars[i + 1].classList.add("sorted");
  return i + 1;
}

function updateComplexities() {
  const algo = selectAlgorithm.value;
  timeComplexity.textContent = complexities[algo].time;
  spaceComplexity.textContent = complexities[algo].space;
  bestAlgorithm.textContent = "Quick Sort";
}

function handleSort() {
  updateComplexities();
  doneMessage.style.display = "none";

  switch (selectAlgorithm.value) {
    case "bubbleSort":
      bubbleSort().then(() => doneMessage.style.display = "block");
      break;
    case "selectionSort":
      selectionSort().then(() => doneMessage.style.display = "block");
      break;
    case "quickSort":
      quickSort().then(() => doneMessage.style.display = "block");
      break;
  }
}

function handleGenerate() {
  const size = parseInt(numbersBars.value) || 20;
  const array = Array.from({ length: size }, () => Math.floor(Math.random() * 300 + 50));
  generateBars(array);
  doneMessage.style.display = "none";
}

function handleCustomSet() {
  const input = customArrayInput.value.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  if (input.length) {
    generateBars(input);
    doneMessage.style.display = "none";
  }
}

function handleReset() {
  const heights = getHeights();
  generateBars(heights);
  doneMessage.style.display = "none";
}

speedSlider.addEventListener("input", () => {
  speed = +speedSlider.value;
  speedValue.textContent = speed;
});

generateBtn.addEventListener("click", handleGenerate);
solveBtn.addEventListener("click", handleSort);
resetBtn.addEventListener("click", handleReset);
setCustomBtn.addEventListener("click", handleCustomSet);

handleGenerate(); // initialize