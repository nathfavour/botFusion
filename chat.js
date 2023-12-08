// const axios = require('axios');
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// // Function to send POST request
// async function sendPostRequest(input) {
//     try {
//         const response = await axios.post('http://localhost:3000/input', input);
//         console.log(`Server responded with status code: ${response.status}`);
//     } catch (error) {
//         console.error(`Failed to send POST request: ${error}`);
//     }
// }
//
// // If an argument is provided, send it as the first POST request
// if (process.argv[2]) {
//     sendPostRequest(process.argv[2]);
// }
//
// // Repeatedly read input from the command line and send as POST requests
// rl.on('line', (input) => {
//     sendPostRequest(input);
// });























const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to send POST request
async function sendPostRequest(input) {
    try {
        const response = await axios.post('http://localhost:3000/input', { input: input });
        console.log(`Server responded with status code: ${response.status}`);
    } catch (error) {
        console.error(`Failed to send POST request: ${error}`);
    }
}


// If an argument is provided, send it as the first POST request and quit
if (process.argv[2]) {
    sendPostRequest(process.argv[2]).then(() => process.exit(0));
}
// else {
//     // Repeatedly read input from the command line and send as POST requests
//     rl.on('line', (input) => {
//         sendPostRequest(input);
//     });
// }



// else {
//     // Initialize an empty string to hold the input
//     let input = '';
//
//     // Listen for 'data' events on the stdin stream
//     process.stdin.on('data', (chunk) => {
//         // Convert the chunk to a string and add it to the input
//         input += chunk.toString();
//
//         // If the input ends with a newline, send it as a POST request
//         if (input.endsWith('\n')) {
//             sendPostRequest(input.trim());
//             // Clear the input string
//             input = '';
//         }
//     });
// }

// else {
//     // Initialize an empty string to hold the input
//     let input = '';
//
//     // Function to handle 'data' events
//     const handleData = (chunk) => {
//         // Convert the chunk to a string and add it to the input
//         input += chunk.toString();
//
//         // If the input ends with a newline, send it as a POST request
//         if (input.endsWith('\n')) {
//             sendPostRequest(input.trim());
//             // Clear the input string
//             input = '';
//             // Remove the 'data' event listener
//             process.stdin.removeListener('data', handleData);
//         }
//     };
//
//     // Listen for 'data' events on the stdin stream
//     process.stdin.on('data', handleData);
// }
//





// else {
//     // Initialize an empty string to hold the input
//     let input = '';
//
//     // Listen for 'line' events on the rl interface
//     rl.on('line', (line) => {
//         // Add the line to the input
//         input += line + '\n';
//     });
//
//     // Listen for 'SIGINT' events on the rl interface
//     rl.on('SIGINT', () => {
//         // Send the input as a POST request
//         sendPostRequest(input.trim());
//         // Clear the input string
//         input = '';
//         // Close the rl interface
//         rl.close();
//     });
// }


// else {
//     // Initialize an empty string to hold the input
//     let input = '';
//
//     // Initialize a variable to keep track of whether Ctrl+C has been pressed before
//     let ctrlCPressed = false;
//
//     // Listen for 'line' events on the rl interface
//     rl.on('line', (line) => {
//         // Add the line to the input
//         input += line + '\n';
//     });
//
//     // Listen for 'SIGINT' events on the rl interface
//     rl.on('SIGINT', () => {
//         // If Ctrl+C has been pressed before, quit the program
//         if (ctrlCPressed) {
//             process.exit(0);
//         }
//
//         // Otherwise, send the input as a POST request, clear the input string,
//         // set ctrlCPressed to true, and display a message to the user
//         sendPostRequest(input.trim());
//         input = '';
//         ctrlCPressed = true;
//         console.log('Press Ctrl+C again to quit.');
//     });
// }




else {
    const inputFile = 'input.txt';
    if (fs.existsSync(inputFile) && fs.readFileSync(inputFile, 'utf8').trim() !== ''){
        const fileContents = fs.readFileSync(inputFile, 'utf8');
        sendPostRequest(fileContents).then(() => {
            // Empty the input.txt file to prevent reuse
            fs.writeFileSync(inputFile, '');
            process.exit(0);
    });
    }else{
    // Initialize an empty string to hold the input
    let input = '';

    // Initialize a variable to keep track of whether Ctrl+C has been pressed before
    let ctrlCPressed = false;

    // Initialize a variable to keep track of whether any other input has been received
    let otherInputReceived = false;

    // Listen for 'line' events on the rl interface
    rl.on('line', (line) => {
        // Add the line to the input
        input += line + '\n';
        // Set otherInputReceived to true
        otherInputReceived = true;
    });

    // Listen for 'SIGINT' events on the rl interface
    rl.on('SIGINT', () => {
        // If Ctrl+C has been pressed before and no other input has been received, quit the program
        if (ctrlCPressed && !otherInputReceived) {
            process.exit(0);
        }

        // Otherwise, send the input as a POST request, clear the input string,
        // set ctrlCPressed to true, set otherInputReceived to false,
        // and display a message to the user
        sendPostRequest(input.trim());
        input = '';
        ctrlCPressed = true;
        otherInputReceived = false;
        console.log('Press Ctrl+C again to quit.');
    });
}}




// Function to send POST request
// async function sendPostRequest(input) {
//     try {
//         const response = await axios.post('http://localhost:3000/input', input);
//         console.log(`Server responded with status code: ${response.status}`);
//     } catch (error) {
//         console.error(`Failed to send POST request: ${error}`);
//     }
// }