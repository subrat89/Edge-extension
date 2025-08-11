let focusMode = false;

// Get site time stats
chrome.storage.local.get("siteTimes", (data) => {
  let statsDiv = document.getElementById("stats");
  let siteTimes = data.siteTimes || {};
  let output = "<strong>Today's Usage:</strong><br>";
  for (let site in siteTimes) {
    let mins = Math.round(siteTimes[site] / 60000);
    output += `${site}: ${mins} min<br>`;
  }
  statsDiv.innerHTML = output || "No data yet.";
});

// Toggle focus mode
document.getElementById("toggleFocus").addEventListener("click", () => {
  focusMode = !focusMode;
  chrome.runtime.sendMessage({ action: "toggleFocus", state: focusMode }, (res) => {
    document.getElementById("toggleFocus").textContent =
      res.focusMode ? "Stop Focus Mode" : "Start Focus Mode";
  });
});
