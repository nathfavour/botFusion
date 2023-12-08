// const { chromium } = require('@playwright/test');
//
// (async () => {
//     // Launch browser
//     const browser = await chromium.launch({ headless: false });
//
//     // Create a new context with the storage state
//     const context = await browser.newContext();
//
//     // Create a new page
//     const page = await context.newPage();
//
//     // Wait for the user to switch to their preferred profile
//     // This is represented by a delay here, adjust the delay as needed
//     await page.waitForTimeout(10000); // waits for 10 seconds
//
//     // Navigate to github.com in the current tab
//     await page.goto('https://github.com');
//
//     // Close the browser
//     await browser.close();
// })();





// const { chromium } = require('@playwright/test');
//
// (async () => {
//     // Launch browser
//     const browser = await chromium.launch({
//         headless: false,
//         // Specify the path to the Google Chrome executable
//         executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
//     });
//
//     // Create a new context with the storage state
//     const context = await browser.newContext();
//
//     // Create a new page
//     const page = await context.newPage();
//
//     // Wait for the user to switch to their preferred profile
//     // This is represented by a delay here, adjust the delay as needed
//     await page.waitForTimeout(15000); // waits for 10 seconds
//
//     // Navigate to github.com in the current tab
//     await page.goto('https://github.com');
//
//     // Close the browser
//     await browser.close();
// })();
//



// const { chromium } = require('playwright');
//
// (async () => {
//     const browser = await chromium.launch({ headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
//     const context = await browser.launchPersistentContext('/Users/xcode/Library/Application Support/Google/Chrome/Profile 4/');
//     const page = await context.newPage();
//     await page.goto('https://github.com');
//     // browser won't close automatically
// })();

// const { chromium } = require('playwright');
//
// (async () => {
//     const browser = await chromium.launch({ headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
//     const context = await chromium.launchPersistentContext('/Users/xcode/Library/Application Support/Google/Chrome/Profile 4/', { headless: false });
//     const page = await context.newPage();
//     await page.goto('https://github.com');
//     // browser won't close automatically
// })();
//


// const { chromium } = require('playwright');
//
// (async () => {
//     const context = await chromium.launchPersistentContext('/Users/xcode/Library/Application Support/Google/Chrome/', {
//         headless: false,
//         executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
//     });
//     const page = await context.newPage();
//     await page.goto('https://github.com');
//     // browser won't close automatically
// })();

//
// const { Builder } = require('selenium-webdriver');
//
// (async function example() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     const readline = require('readline').createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//
//     readline.question('Have you logged in ', name => {
//         console.log(`Hello ${name}! How are you today?`);
//         readline.close();
//     });
//     try {
//         await input()
//         await driver.get('http://www.google.com');
//     } finally {
//         await driver.quit();
//     }
// })();
//
//
//


const { Builder } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Open a new tab and wait for the user to manually navigate to the desired website and log in
    await driver.get('about:blank');

    let loggedIn = false;
    while (!loggedIn) {
        await new Promise((resolve) => {
            readline.question('Have you logged in? (yes/no) ', answer => {
                if (answer.toLowerCase().includes('yes')) {
                    loggedIn = true;
                }
                resolve();
            });
        });
    }

    readline.close();

    try {
        // Perform web automation actions here
        // ...
    } finally {
        // await driver.quit();
    }
})();