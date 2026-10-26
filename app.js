// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.
import PromptSync from 'prompt-sync';
import Riddle from './classes/Riddle.js'
import Player from './classes/Player.js'
 import index from './riddles/index.js'
import readline from 'readline-sync';
const prompt=PromptSync()
let name= prompt("Welcome to tha Game. enter your name ")
let player=new Player(name)
let arr=index;
arr.forEach(x=>
{
let timeStart=Date.now()
let temp=new Riddle(x.id,x.name,x.taskDescription,x.correctAnswer)
temp.ask(prompt)
let timeEnd=Date.now()
player.recordTime(timeStart,timeEnd);
})

player.showStats();
