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
        navigator.clipboard.writeText(data).then(() => {
            alert("Copied Umbraco clipboard to system clipboard");
        }).catch(err => {
			console.error("Clipboard write failed", err);
			alert("Clipboard write failed");
		});
    } else {
        alert("No Umbraco clipboard data found.");
    }
}

function pasteUmbracoClipboard() {
	
    navigator.clipboard.readText().then(text => {
        if (text) {
			
            let existingData = localStorage.getItem("ls.umbClipboardService");
            let parsedExisting = existingData ? JSON.parse(JSON.parse(existingData)) : {};
			
			var entries = parsedExisting.entries ?? [];
			
			try {
				let pastedData = JSON.parse(JSON.parse(text));
				let pastedEntries = pastedData.entries ?? [];
				
				pastedEntries.forEach((entry, index) => {
					pastedEntries[index].label = `${entry.label} (IMPORTED)`;
				});
				entries = entries.concat(pastedEntries);
				
			} catch (e) {
				alert("Invalid clipboard");
				return;
			}
			
			var newObject = { entries: entries };
			
			let newString = JSON.stringify(JSON.stringify(newObject));
			
			localStorage.setItem("ls.umbClipboardService", newString);
			alert("Pasted Umbraco clipboard content");
			
			
        } else {
			alert("Empty/Invalid clipboard");
		}
    }).catch(err => {
		alert("Clipboard read failed");
		console.error("Clipboard read failed", err);
	});
}
