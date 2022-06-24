"use strict";

import * as fs from "fs";

const robloxVersionsPath = process.env["LOCALAPPDATA"] + "\\Roblox\\Versions";
if (!fs.existsSync(robloxVersionsPath)) {
	throw "Seems like you don't have roblox installed!";
}

const readdirResult = fs.readdirSync(robloxVersionsPath);
for (let versionId of readdirResult) {
	if (versionId == "RobloxStudioLauncherBeta.exe") continue; // not sure why this is here lol

	const robloxPath = robloxVersionsPath + `\\${versionId}`;

	if (fs.existsSync(robloxPath + "\\RobloxPlayerBeta.exe")) {
		if (fs.existsSync(robloxPath + "\\ClientSettings")) continue;

		fs.mkdirSync(robloxPath + "\\ClientSettings");

		// Make file
		fs.writeFile(
			robloxPath + "\\ClientSettings\\ClientAppSettings.json",
			"{\"FFlagHandleAltEnterFullscreenManually\":\"False\"}",
			err => {
				if (err) throw err;
				console.log("Successfully enabled Alt+Enter!")
			}
		);
	}
}