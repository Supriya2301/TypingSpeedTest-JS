const paragraph = 
  `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`
;


const startBtn = document.getElementById("start-btn");
const retryBtn = document.getElementById("retry-btn");
const input = document.getElementById("input");
const paragraphElement = document.getElementById("sentence");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultSection = document.getElementById("result");

let startTime, endTime;
let timerDuration = 30; // 30 seconds
let timerId;

function startTest() {
  input.disabled = false;
  retryBtn.disabled = true;

  paragraphElement.textContent = paragraph;
  input.value = "";

  startTime = new Date().getTime();
  updateTimer();
  timerId = setInterval(updateTimer, 1000);

  startBtn.disabled = true; 
}
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    const remainingTime = Math.max(timerDuration - elapsedTime, 0);
  
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    timerElement.textContent = `Time: ${formattedMinutes}:${formattedSeconds}`;
  
    if (remainingTime === 0) {
      clearInterval(timerId);
      endTest();
    }
  }

function endTest() {
  endTime = new Date().getTime();
  clearInterval(timerId);

  const elapsedTime = (endTime - startTime) / 1000;
  const wordsTyped = input.value.trim().split(/\s+/).length;
  const charactersTyped = input.value.trim().length;

  const correctWords = calculateCorrectWords();
  const accuracy = Math.round((correctWords / charactersTyped) * 100);

  const wordsPerMinute = Math.round((wordsTyped / elapsedTime) * 60);

  speedElement.textContent = wordsPerMinute;
  accuracyElement.textContent = accuracy;
  resultSection.style.display = "block";
  retryBtn.disabled = false;

  // Disable input and start button
  input.disabled = true;
  startBtn.disabled = true;
}

function calculateCorrectWords() {
  const typedWords = input.value.trim().split(/\s+/);
  const targetWords = paragraph.split(/\s+/);

  let correctWords = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === targetWords[i]) {
      correctWords++;
    }
  }

  return correctWords;
}

startBtn.addEventListener("click", startTest);
retryBtn.addEventListener("click", () => {
  startBtn.disabled = false;
  input.disabled = false;
  resultSection.style.display = "none";
  clearInterval(timerId); 
  timerElement.textContent = ""; 
  input.value = ""; 
});

input.addEventListener("input", () => {
  const typedWords = input.value.trim().split(/\s+/);
  const targetWords = paragraph.split(/\s+/);

  if (typedWords.length === targetWords.length) {
    endTest();
  }
});