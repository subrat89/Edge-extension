let siteListEl = document.getElementById("siteList");
let siteInput = document.getElementById("siteInput");

chrome.storage.local.get("blockedSites", (data) => {
  let sites = data.blockedSites || [];
  renderSites(sites);
});

document.getElementById("addSite").addEventListener("click", () => {
  let site = siteInput.value.trim();
  if (!site) return;
  chrome.storage.local.get("blockedSites", (data) => {
    let sites = data.blockedSites || [];
    if (!sites.includes(site)) {
      sites.push(site);
      chrome.storage.local.set({ blockedSites: sites });
      renderSites(sites);
    }
  });
  siteInput.value = "";
});

function renderSites(sites) {
  siteListEl.innerHTML = "";
  sites.forEach((site, index) => {
    let li = document.createElement("li");
    li.textContent = site;
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => {
      sites.splice(index, 1);
      chrome.storage.local.set({ blockedSites: sites });
      renderSites(sites);
    };
    li.appendChild(removeBtn);
    siteListEl.appendChild(li);
  });

  chrome.runtime.sendMessage({ action: "updateBlockedSites", sites });
}
