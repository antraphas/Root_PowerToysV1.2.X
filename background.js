chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        const authHeader = details.requestHeaders.find(header => header.name.toLowerCase() === "authorization");
        if (authHeader) {
            const token = authHeader.value;
            chrome.storage.local.set({ authToken: token }, () => {});
        }
    },
    { urls: ["https://root.anota.ai/*"] },
    ["requestHeaders"]
);