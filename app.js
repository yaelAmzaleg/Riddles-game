import PromptSync from 'prompt-sync';
import { getAllRiddles, createRiddle, updateRiddle, deleteRiddle } from './api/riddlesApi.js';
import { getAllPlayers, findPlayerByName, createPlayer, updatePlayer } from './api/playersApi.js';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js'
const prompt = PromptSync();
async function runApp() {
    let isRunning = true;
    while (isRunning) {
        console.log("\n==============================");
        console.log("🎯 Riddle Game - Main Menu");
        console.log("==============================");
        console.log("1. Play the game");
        console.log("2. Create a new riddle");
        console.log("3. Read all riddles");
        console.log("4. Update an existing riddle");
        console.log("5. Delete a riddle");
        console.log("6. View leaderboard");
        console.log("0. Exit");
        const choice = prompt("What do you want to do? ");
        switch (choice) {
            case '1':
                console.log("\n🎮 Starting the game...");
                await playGame();
                break;
            case '2':
                await handleCreateRiddle()
                break;

            case '3':
                await handleReadRiddles()
                break;

            case '4':
                await handleUpdateRiddle()
                break;

            case '5':
                await handleDeleteRiddle()
                break;

            case '6':
                await handleLeaderboard();
                break;

            case '0':
                console.log("\n👋 Exiting game. Goodbye!");
                isRunning = false;
                break;

            default:
                console.log("\n⚠️ Invalid choice. Please enter a number between 0 and 6.");
        }
    }
}
runApp();
async function playGame() {
    try {
        const name = prompt("Welcome to the Game. Enter your name: ");
        let currentPlayer;
        let existingPlayer = await findPlayerByName(name);
        if (existingPlayer) {
            currentPlayer = existingPlayer; 
            if (currentPlayer.lowestTime !== null && currentPlayer.lowestTime !== undefined) {
                console.log(`Hi ${currentPlayer.name}! Your previous lowest time was ${currentPlayer.lowestTime} seconds.`);
            } else {
                console.log(`Hi ${currentPlayer.name}! Welcome back.`);
            }
        } else {
            currentPlayer = await createPlayer(name);
            console.log(`Welcome, ${name}! You've been added to the players database.`);
        }
        const riddlesData = await getAllRiddles();
        if (!riddlesData || riddlesData.length === 0) {
            console.log("⚠️ No riddles found in the database. Please add some riddles first!");
            return;
        }
        let arr = [...riddlesData];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        let player = new Player(name);
        arr.forEach(x => {
            let timeStart = Date.now();
            let timeEnd = new Riddle(x.id, x.name, x.taskDescription, x.correctAnswer).ask(prompt, timeStart);
            player.recordTime(timeStart, timeEnd);
        });
        player.showStats();
        const totalTimeSeconds = Number((player.times.reduce((acc, curr) => acc + curr, 0) / 1000).toFixed(1));
        if (currentPlayer.lowestTime === null || currentPlayer.lowestTime === undefined || totalTimeSeconds < currentPlayer.lowestTime) {
            currentPlayer.lowestTime = totalTimeSeconds;
            await updatePlayer(currentPlayer);
            console.log(`\n🎉 Great job, ${name}!`);
            console.log(`Your time: ${totalTimeSeconds} seconds`);
            console.log(`New record! Time updated.`);
        } else {
            console.log(`\nGreat job, ${name}!`);
            console.log(`Your time: ${totalTimeSeconds} seconds.`);
            console.log(`(Your best record is still ${currentPlayer.lowestTime} seconds)`);
        }

    } catch (error) {
        console.error("❌ Error running the game. Make sure json-server is running (npm run server).", error.message);
    }
}
async function handleCreateRiddle() {
    console.log("\n➕ Create a new riddle:");
    const name = prompt("Enter riddle name: ");
    const taskDescription = prompt("Enter description: ");
    const correctAnswer = prompt("Enter correct answer: ");
    try {
        await createRiddle({ name, taskDescription, correctAnswer })
        console.log("✅ Riddle saved!");
    }
    catch (error) {
        console.log("❌ Failed to save riddle. Make sure the server is running.");
    }
}
async function handleReadRiddles() {
    console.log("\n📖 Reading all riddles from DB...");
    try {
        const riddles = await getAllRiddles();
        console.table(riddles)
    } catch (error) {
        console.log("❌ Server is offline or unreachable.");
    }
}
async function handleUpdateRiddle() {
    console.log("\n✏️ Update an existing riddle:");
    const id = prompt("Enter the ID of the riddle you want to update: ");
    const name = prompt("Enter new riddle name: ");
    const taskDescription = prompt("Enter new description: ");
    const correctAnswer = prompt("Enter new correct answer: ");
    try {
        await updateRiddle(id, { name, taskDescription, correctAnswer })
        console.log(`✅ Riddle with ID ${id} updated successfully!`);
    }
    catch (error) {
        console.log("❌ Failed to update riddle. Make sure the ID exists.");
    }
}
async function handleDeleteRiddle() {
    console.log("\n🗑️ Delete a riddle:");
    const id = prompt("Enter the ID of the riddle you want to delete: ");
    try {
        await deleteRiddle(id);
        console.log(`✅ Riddle with ID ${id} deleted successfully!`);
    } catch (error) {
        console.log("❌ Failed to delete riddle. Make sure the ID exists.");
    }
}
async function handleLeaderboard() {
    console.log("\n🏆 Leaderboard:");
    try {
        const players = await getAllPlayers();
        const finishedPlayers = players
            .filter(p => p.lowestTime !== null && p.lowestTime !== undefined)
            .sort((a, b) => a.lowestTime - b.lowestTime);
        if (finishedPlayers.length === 0) {
            console.log("No players on the leaderboard yet. Be the first to play!");
            return;
        }
        finishedPlayers.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} - ${player.lowestTime} seconds`);
        });
    } catch (error) {
        console.log("❌ Failed to load leaderboard.");
    }
}
