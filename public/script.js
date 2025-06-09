const logEl = document.getElementById("logOutput");
let intervalIds = [];

function log(message, robotId, task) {
  const entry = document.createElement("p");
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}

function simulateRobot(robotId, task) {
  return setInterval(() => {
    const robotEl = document.getElementById(robotId);
    if (!robotEl) return;

    robotEl.classList.add("glowing");
    log(`${robotId} is ${task}...`, robotId, task);

    setTimeout(() => {
      robotEl.classList.remove("glowing");
    }, 1000);
  }, Math.random() * 2000 + 2000);
}

function startShift() {
  log("Shift started.");
  intervalIds.push(simulateRobot("robot1", "moving boxes"));
  intervalIds.push(simulateRobot("robot2", "scanning items"));
  intervalIds.push(simulateRobot("robot3", "packing items"));
}

function stopShift() {
  log("Shift stopped.");
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

document.getElementById("startBtn").addEventListener("click", startShift);
document.getElementById("stopBtn").addEventListener("click", stopShift);
