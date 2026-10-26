// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle
import PromptSync from 'prompt-sync';
class Player{
    constructor(name)
    {
        this.name=name;
        this.times=[];
    }
    recordTime(start, end)
    {
    this.times.push(((end-start)/1000));
    }
     showStats() 
     {
        let avg=0;
        let sum=0;
        this.times.forEach(element =>
          sum+=element);
          avg=sum / (this.times.length);
          console.log(`Sum Times:${sum} , Avg Times:${avg}`)
     }
}
export default Player;


