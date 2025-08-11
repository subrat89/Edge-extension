let blockedSites = [];
let activeTab = null;
let startTime = null;
let siteTimes = {};
let focusMode = false;

// Load settings
chrome.storage.local.get(["blockedSites", "siteTimes"], (data) => {
  blockedSites = data.blockedSites || ["facebook.com", "youtube.com"];
  siteTimes = data.siteTimes || {};
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(activeInfo => {
  logTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url) {
      activeTab = new URL(tab.url).hostname;
      startTime = Date.now();
      checkBlock(tab);
    }
  });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    logTime();
    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
    checkBlock(tab);
  }
});

// Log time spent on the active tab
function logTime() {
  if (activeTab && startTime) {
    let spent = Date.now() - startTime;
    siteTimes[activeTab] = (siteTimes[activeTab] || 0) + spent;
    chrome.storage.local.set({ siteTimes });
  }
}

// Block distracting sites in focus mode
function checkBlock(tab) {
  if (focusMode && blockedSites.some(site => tab.url.includes(site))) {
    chrome.tabs.update(tab.id, {
      url: chrome.runtime.getURL("blocked.html")
    });
  }
}

// Messages from popup/options
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleFocus") {
    focusMode = message.state;
    sendResponse({ focusMode });
  }
  if (message.action === "updateBlockedSites") {
    blockedSites = message.sites;
    chrome.storage.local.set({ blockedSites });
  }
});
