chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // if user opens a new tab
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    // if the tab is for watching a new youtube video
    const queryParams = tab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParams);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParams.get("v"), // v=unique videoId
    });
  }
});
