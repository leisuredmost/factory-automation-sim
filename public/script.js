const API_BASE = "https://factory-automation-sim.onrender.com";
let intervalIds = [];

function log(message, robotId, task) {
  const logEl = document.getElementById("logOutput");
  const entry = document.createElement("p");
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;

  console.log("📤 Logging to backend:", { robotId, task });

// Send log to backend
  if (robotId && task) {
    fetch(`${API_BASE}/api/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ robotId, task }),
    })
    .then((res) => res.json())
    .then((data) => console.log("✅ Backend responded:", data))
    .catch((err) => console.error("❌ Fetch error:", err));
  }
}

function simulateRobot(robotId, task) {
  return setInterval(() => {
    const robotEl = document.getElementById(robotId);
    robotEl.style.background = "#a0ffa0";
    log(`${robotId} is ${task}...`, robotId, task);
    setTimeout(() => {
      robotEl.style.background = "#fff";
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
