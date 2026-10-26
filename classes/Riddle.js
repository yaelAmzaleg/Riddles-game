// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct
import readline from 'readline-sync';
class Riddle{
    constructor(id,name,taskDescription,correctAnswer)
    {
        this.id=id;
        this.name=name;
        this.taskDescription=taskDescription;
        this.correctAnswer=correctAnswer;
    }
    ask(prompt)
    {
        console.log(`Riddle number ${this.id}`)
        console.log(`Name Of Riddle:${this.name}`)
        console.log(`taskDescription: ${this.taskDescription}`)
        let yourAnswer =0
       while(yourAnswer!=this.correctAnswer)
       {
       yourAnswer=prompt("Enter your Answer")
       }
    }
}
export default Riddle;