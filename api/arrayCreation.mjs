//jshint esversion:6

export function arrayCreation(performances){
    performances.sort((a,b) => {
        return a.count - b.count;
    });
    arr = [];
    temp = [];
    let i = 0
    performances.forEach(performance =>{
        if(i < 3){
            arr.push(performance.performanceName);
        }
        else{
            temp.push(performance.performanceName);
        }
        max = Math.max(max, performance.count);
        i++;
    });
}
