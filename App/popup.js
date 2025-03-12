let copyButton = document.getElementById("copyBtn"), pasteButton = document.getElementById("pasteBtn");

if (copyButton && pasteButton) {
	copyButton.addEventListener("click", async () => {
		const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
		browser.tabs.executeScript(tab.id, { code: `(${copyUmbracoClipboard.toString()})()` });
	});

	pasteButton.addEventListener("click", async () => {
		const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
		browser.tabs.executeScript(tab.id, { code: `(${pasteUmbracoClipboard.toString()})()` });
	});
}

function copyUmbracoClipboard() {
    const data = localStorage.getItem("ls.umbClipboardService");

    if (data) {
        chrome.storage.local.set({ umbClipboard: data }, () => {
            alert("Copied Umbraco clipboard");
        });
    } else {
        alert("No Umbraco clipboard data found.");
    }
}

function pasteUmbracoClipboard() {
    chrome.storage.local.get("umbClipboard", (result) => {
        let existingData = localStorage.getItem("ls.umbClipboardService");
        let parsedExisting = existingData ? JSON.parse(JSON.parse(existingData)) : {};

        var entries = parsedExisting.entries ?? [];

        if (result.umbClipboard) {
            try {
                let pastedData = JSON.parse(JSON.parse(result.umbClipboard));
                let pastedEntries = pastedData.entries ?? [];

                pastedEntries.forEach((entry, index) => {
                    pastedEntries[index].label = `${entry.label} (IMPORTED)`;
                });

                entries = entries.concat(pastedEntries);
            } catch (e) {
                alert("Invalid clipboard data");
                return;
            }

            var newObject = { entries: entries };
            let newString = JSON.stringify(JSON.stringify(newObject));

            localStorage.setItem("ls.umbClipboardService", newString);
            alert("Pasted Umbraco clipboard");
        } else {
            alert("No clipboard data found");
        }
    });
}