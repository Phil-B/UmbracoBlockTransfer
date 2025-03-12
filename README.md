# UmbracoBlockTransfer
Firefox Extension to copy and paste Umbraco block content between instances

# Installation
1. Go to about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on..."
3. Locate and select the manifest.json file 

# Usage
1. On the source instance, copy the required content. To copy all blocks, use the Ellipsis underneath the property label
2. Click the extension's "Copy Umbraco Clipboard" button
3. On the destination instance, click the "Paste Umbraco Clipboard" button
4. Use Umbraco's Block Editor clipboard feature to paste the content

# Limitations
* After pasting to the target instance, the clipboard won't be available until the page is reloaded
* Media will need to be manually transferred
* This has only been tested with Umbraco 13
