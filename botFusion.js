const { chromium } = require('playwright');
const axios = require('axios');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const ini = require('ini');
const { promisify } = require('util');
const renameAsync = promisify(fs.rename);

const settingsFilePath = process.argv.includes('--settings')
    ? process.argv[process.argv.indexOf('--settings') + 1]
    : path.join(__dirname, 'settings.ini');

if (!fs.existsSync(settingsFilePath)) {
    fs.writeFileSync(settingsFilePath, 'ioFolder = .\n');
}

const settings = ini.parse(fs.readFileSync(settingsFilePath, 'utf-8'));

const inputFolderPath = path.join(settings.DEFAULT.ioFolder, 'input');

if (!fs.existsSync(inputFolderPath)) {
    fs.mkdirSync(inputFolderPath);
}

const username = settings.login.username;
const password = settings.login.password;
const chatUrl = "https://huggingface.co/chat"
const loginUrl = "huggingface.co/login"
const loginButton = "body > div:nth-child(3) > div > div > div > div > form > button"
const usernameElement = "body > div > main > div > section > form > div.mb-8.grid.grid-cols-1.gap-3 > label:nth-child(1) > input"
const passwordElement = "body > div > main > div > section > form > div.mb-8.grid.grid-cols-1.gap-3 > label:nth-child(2) > input"
//const searchWeb = "#app > div.grid.h-full.w-screen.grid-cols-1.grid-rows-\[auto\,1fr\].overflow-hidden.text-smd.dark\:text-gray-300.md\:grid-cols-\[280px\,1fr\].md\:grid-rows-\[1fr\] > div > div.pointer-events-none.absolute.inset-x-0.bottom-0.z-0.mx-auto.flex.w-full.max-w-3xl.flex-col.items-center.justify-center.md\:px-5.md\:py-8.xl\:max-w-4xl.\[\&\>\*\]\:pointer-events-auto > div.dark\:via-gray-80.w-full.bg-gradient-to-t.from-white.via-white\/80.to-white\/0.dark\:border-gray-800.dark\:from-gray-900.dark\:to-gray-900\/0.max-md\:border-t.max-md\:bg-white.max-md\:px-4.max-md\:dark\:bg-gray-900 > div.flex.w-full.pb-3.max-md\:pt-3 > div > div.relative.inline-flex.h-5.w-9.shrink-0.items-center.rounded-full.bg-gray-300.p-1.shadow-inner.ring-gray-400.transition-all.peer-checked\:bg-blue-600.peer-focus-visible\:ring.peer-focus-visible\:ring-offset-1.hover\:bg-gray-400.dark\:bg-gray-600.peer-checked\:\[\&\>div\]\:translate-x-3\.5 > div"
const searchWeb = "//*[@id=\"app\"]/div[1]/div/div[2]/div[2]/div[1]/div/div[1]/div"
// const nElement = "#app > div.grid.h-full.w-screen.grid-cols-1.grid-rows-\[auto\,1fr\].overflow-hidden.text-smd.dark\:text-gray-300.md\:grid-cols-\[280px\,1fr\].md\:grid-rows-\[1fr\] > div > div.scrollbar-custom.mr-1.h-full.overflow-y-auto > div > div:nth-child(n)"
// const nElement = "#app > div.grid.h-full.w-screen.grid-cols-1.grid-rows-\\[auto\\,1fr\\].overflow-hidden.text-smd.dark\\:text-gray-300.md\\:grid-cols-\\[280px\\,1fr\\].md\\:grid-rows-\\[1fr\\] > div > div.scrollbar-custom.mr-1.h-full.overflow-y-auto > div > div:nth-child(n)";
// const textArea = "#app > div.grid.h-full.w-screen.grid-cols-1.grid-rows-\[auto\,1fr\].overflow-hidden.text-smd.dark\:text-gray-300.md\:grid-cols-\[280px\,1fr\].md\:grid-rows-\[1fr\] > div > div.pointer-events-none.absolute.inset-x-0.bottom-0.z-0.mx-auto.flex.w-full.max-w-3xl.flex-col.items-center.justify-center.md\:px-5.md\:py-8.xl\:max-w-4xl.\[\&\>\*\]\:pointer-events-auto > div.dark\:via-gray-80.w-full.bg-gradient-to-t.from-white.via-white\/80.to-white\/0.dark\:border-gray-800.dark\:from-gray-900.dark\:to-gray-900\/0.max-md\:border-t.max-md\:bg-white.max-md\:px-4.max-md\:dark\:bg-gray-900 > form > div > div > textarea"
const nElementParent = "#app div.scrollbar-custom > div";
const textArea = "#app div.pointer-events-none > div > form > div > div > textarea"
// const nElement = "#app > div.grid.h-full.w-screen.grid-cols-1.grid-rows-\\[auto\\,1fr\\].overflow-hidden.text-smd.dark\\:text-gray-300.md\\:grid-cols-\\[280px\\,1fr\\].md\\:grid-rows-\\[1fr\\] > div > div.scrollbar-custom.mr-1.h-full.overflow-y-auto > div > div:nth-child(n)";
async function performActions(page, loginUrl, loginButton, chatUrl, usernameElement, username, passwordElement, password, searchWeb) {
    // Visit loginUrl

    await page.setDefaultTimeout(120000); // Set default timeout to 60 seconds

    await page.goto(chatUrl);
    await page.waitForLoadState('networkidle');

    // Wait for the presence of loginButton and click it
    await page.waitForSelector(loginButton, { state: 'visible' });
    await page.click(loginButton);

    // // Listen until the current url contains loginUrl
    // await page.waitForNavigation({ url: `**/${loginUrl}**` });

    // while (!page.url().includes(loginUrl)) {
    //     await page.waitForTimeout(1000); // wait for 1 second before checking again
    // }

    await page.waitForLoadState('load');

    // Send username string to usernameElement
    await page.waitForSelector(usernameElement, { state: 'visible' });
    await page.fill(usernameElement, username);

    // Send password to passwordElement
    await page.waitForSelector(passwordElement, { state: 'visible' });
    await page.fill(passwordElement, password);
    await page.press(passwordElement, 'Enter');

    await page.waitForLoadState('load');

    // When searchWeb element is clickable, click on it to toggle "search web option"
    // await page.waitForSelector(searchWeb, { state: 'visible' });
    // await page.click(searchWeb);

    // await page.waitForXPath(searchWeb, { state: 'visible' });
    // const elementHandle = await page.$x(searchWeb);
    // await elementHandle[0].click();

    // // When searchWeb element is clickable, click on it to toggle "search web option"
    // await page.waitForSelector(searchWeb, { state: 'visible' });
    // const elementHandle = await page.$(searchWeb);
    // await elementHandle.click();
}

// async function main() {
//     await initializePage();
//     await performActions(page, loginUrl, loginButton, chatUrl, usernameElement, username, passwordElement, password, searchWeb);
// }

// main();

// async function processFile(filePath) {
//     // Read and parse the file
//     const fileContents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//
//     // Get the input from the file
//     const currentInput = fileContents.input;
//
//     let elements = await page.$$(nElement.replace('n', '*'));
//
//     // If elements exist, set n to the value of the last element
//     let n = elements.length > 0 ? parseInt(elements[elements.length - 1].id.match(/:nth-child\((\d+)\)/)[1]) : 0;
//
//     await page.waitForSelector(textArea, {state:'visible'});
//     await page.fill(textArea, currentInput);
//     await page.press(textArea, 'Enter');
//
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//
//     n++;
//
//     await page.waitForSelector(nElement.replace('n', n), {state: 'attached'});
//
//     const newElement = await page.$(nElement.replace('n', n));
//     const currentResponse = await newElement.textContent();
//     console.log(currentResponse);
//
//
//     fs.appendFileSync(filePath, '\n{"output":$$(currentResponse)}');
//
//     fs.renameSync(filePath, `${filePath}t`);
// }



async function processFile(filePath) {
    // Read and parse the file
    const fileContents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Get the input from the file
    const currentInput = fileContents.input;

    // const nElementParent = '#app > div.grid.h-full.w-screen.grid-cols-1.grid-rows-[auto,1fr].overflow-hidden.text-smd.dark:text-gray-300.md:grid-cols-[280px,1fr].md:grid-rows-[1fr] > div > div.scrollbar-custom.mr-1.h-full.overflow-y-auto > div';
    // let elements = await page.$$(nElementParent + ' > div');
    //
    // // If elements exist, set n to the value of the last element
    // let n = elements.length;

    await page.waitForSelector(textArea, {state:'visible'});
    await page.fill(textArea, currentInput);
    await page.press(textArea, 'Enter');

    // await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // // Wait for the new element to be added
    // while (true) {
    //     let newElements = await page.$$(nElementParent + ' > div');
    //     if (newElements.length > n) {
    //         elements = newElements;
    //         break;
    //     }
    //     await page.waitForTimeout(1000); // wait for 1 second before checking again
    // }
    //
    //
    //


    // Define the simplified selector
    //let nElementParent = "#app div.scrollbar-custom > div";

    // Wait for the page to load completely
       // await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Wait for any updates to the page to finish
        await page.waitForTimeout(2000); // adjust the timeout as needed

    // Get all the div elements within nElementParent
        let elements = await page.$$(nElementParent + ' > div');

    // Check if there are any elements
    if (elements.length > 0) {
        // Get the last div element
        let lastElement = elements[elements.length - 1];

        // await page.waitForNavigation({ waitUntil: 'networkidle0' });




        let currentResponse = "";
        let previousResponse = null;
        let unchangedCount = 0;

// Keep checking for changes in the text content
        while (true) {
            // Get all the div elements within nElementParent
            let elements = await page.$$(nElementParent + ' > div');

            // Check if there are any elements
            if (elements.length > 0) {
                // Get the last div element
                let lastElement = elements[elements.length - 1];

                // Extract its text content into the currentResponse variable
                currentResponse = await page.evaluate(el => el.textContent, lastElement);
            }

            // If the text content hasn't changed for 10 subsequent checks, assume it's the final content
            if (currentResponse === previousResponse) {
                unchangedCount++;
                if (unchangedCount >= 10) {
                    break;
                }
            } else {
                unchangedCount = 0;
            }

            previousResponse = currentResponse;

            // Wait for half a second before checking again
            await page.waitForTimeout(500);
        }



        // Extract its text content into the currentResponse variable
        // let currentResponse = await page.evaluate(el => el.textContent, lastElement);

        console.log(currentResponse); // print the text content


    // const newElement = elements[elements.length - 1];
    // const currentResponse = await newElement.textContent();
    // console.log(currentResponse);

    fs.appendFileSync(filePath, '\n{"output":$$(currentResponse)}');

    fs.renameSync(filePath, `${filePath}t`);
    }
}





async function checkForNewFiles() {
    const files = fs.readdirSync(inputFolderPath);

    await Promise.all(files.map(async (file) => {
        if (!file.endsWith('t')) {
            await processFile(path.join(inputFolderPath, file));
        }
    }));

    setTimeout(checkForNewFiles, 1000);
}

// checkForNewFiles();


let page;

// async function initializePage() {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     page = await context.newPage();
// }

async function initializePage() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
}

async function main() {
    await initializePage();
    await performActions(page, loginUrl, loginButton, chatUrl, usernameElement, username, passwordElement, password, searchWeb);
    await checkForNewFiles();
}

// main();

main();
