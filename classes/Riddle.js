import readline from 'readline-sync';
class Riddle {
    constructor(id, name, taskDescription, correctAnswer, difficulty, timeLimit, hint) {
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty
        this.timeLimit = timeLimit
        this.hint = hint
    }
    ask(prompt, time_start) {
        console.log(`Riddle number ${this.id}`)
        console.log(`Name Of Riddle:${this.name}`)
        console.log(`taskDescription: ${this.taskDescription}`)
        console.log(`Time Limit:${this.timeLimit}`)
        let yourAnswer = 0
        let time_now = 0
        let time_to_add = 0
        console.log("if you would like a hint type the word hint")
        while (yourAnswer != this.correctAnswer) {
            yourAnswer = prompt("Enter your Answer")
            if (yourAnswer == "hint") {
                console.log(this.hint)
                time_to_add += 10
            }
        }
        if ((Date.now() - time_start) >= this.timeLimit) {
            console.log("Too slow! 5 seconds penalty applied.")
            time_to_add += 5
        }
        return Date.now() + time_to_add;
    }
}
export default Riddle;