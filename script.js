const teaTypeSelect = document.getElementById("tea-type");
const instructionsText = document.getElementById("instructions-text");
const timerDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

let stopBtn = null; // Placeholder for the stop button
let timer = null;
let timeRemaining = 0;

// Tea settings for brewing
const teaSettings = {
  green: { time: 120, temp: "75-85°C" },
  black: { time: 180, temp: "95°C" },
  oolong: { time: 180, temp: "85-95°C" },
  herbal: { time: 300, temp: "95°C" },
};

// Update instructions and timer when a tea type is selected
teaTypeSelect.addEventListener("change", () => {
  clearInterval(timer); // Stop any running timer
  timer = null; // Reset the timer variable

  const tea = teaTypeSelect.value;

  if (tea === "") {
    instructionsText.textContent = "Please select a tea type to see instructions.";
    timerDisplay.textContent = "--:--";
    return;
  }

  const { time, temp } = teaSettings[tea];
  instructionsText.textContent = `Brew ${tea} tea at ${temp} for ${
    time / 60
  } minutes.`;
  timerDisplay.textContent = `${Math.floor(time / 60)}:00`;
  timeRemaining = time;

  // Ensure Start button text resets
  startBtn.textContent = "Start Timer";
});

// Start the timer
startBtn.addEventListener("click", () => {
  if (!teaTypeSelect.value) {
    instructionsText.textContent = "Please select a tea type first!";
    return;
  }

  if (timer) {
    clearInterval(timer); // If the timer is already running, reset it
    timer = null;
    startBtn.textContent = "Start Timer";
    return;
  }

  if (timeRemaining === 0) {
    instructionsText.textContent = "Select a tea type to start!";
    return;
  }

  startBtn.textContent = "Pause Timer";

  timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
      clearInterval(timer);
      timer = null;
      instructionsText.textContent = "Your tea is ready! Enjoy!";
      startBtn.textContent = "Start Timer";
    }
  }, 1000);
});

// Add a stop timer function
function addStopButton() {
  stopBtn = document.createElement("button");
  stopBtn.textContent = "Stop Timer";
  stopBtn.style.marginTop = "10px";
  stopBtn.style.padding = "10px 20px";
  stopBtn.style.fontSize = "16px";
  stopBtn.style.backgroundColor = "#f44336";
  stopBtn.style.color = "#fff";
  stopBtn.style.border = "none";
  stopBtn.style.borderRadius = "4px";
  stopBtn.style.cursor = "pointer";

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    timeRemaining = 0;
    timerDisplay.textContent = "--:--";
    instructionsText.textContent = "Timer stopped. Select a tea type to restart.";
    startBtn.textContent = "Start Timer";
  });

  document.querySelector(".timer").appendChild(stopBtn);
}

// Ensure the stop button is added
if (!stopBtn) {
  addStopButton();
}
