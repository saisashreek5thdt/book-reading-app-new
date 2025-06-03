// bump-version.js

const fs = require("fs");

const appJsonPath = "./app.json";
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

const versionParts = appJson.expo.version.split(".").map(Number);
versionParts[2] += 1; // Bump patch version
appJson.expo.version = versionParts.join(".");

// Android build number
appJson.expo.android = appJson.expo.android || {};
appJson.expo.android.versionCode = (appJson.expo.android.versionCode || 1) + 1;

// iOS build number
appJson.expo.ios = appJson.expo.ios || {};
appJson.expo.ios.buildNumber = (
  parseInt(appJson.expo.ios.buildNumber || "1") + 1
).toString();

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
console.log("✅ Updated version and build numbers:");
console.log(`Version: ${appJson.expo.version}`);
console.log(`Android versionCode: ${appJson.expo.android.versionCode}`);
console.log(`iOS buildNumber: ${appJson.expo.ios.buildNumber}`);
