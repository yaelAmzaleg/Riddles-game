import readline from 'readline-sync';
class Riddle {
    constructor(id, name, taskDescription, correctAnswer) {
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }
    ask(prompt, time_start) {
        console.log(`Riddle number ${this.id}`)
        console.log(`Name Of Riddle:${this.name}`)
        console.log(`taskDescription: ${this.taskDescription}`)
        let yourAnswer = 0
        let time_to_add = 0
        while (yourAnswer != this.correctAnswer) {
            yourAnswer = prompt("Enter your Answer")
        }
        return Date.now() 
    }
}
export default Riddle;