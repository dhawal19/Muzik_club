//jshint esversion:6
import { getPerformances } from './performances.mjs'
import { arrayCreation} from './arrayCreation.mjs';

let start = 5;
let end = 8;

const slots = {};

// const arr = ["A", "B", "C"];
let arr = [];
let temp = [];

let max = -1;

const performances = await getPerformances();


function TimeArray(){
    let interval = (end - start)/arr.length;
    let i = start
    while(i < end){
        if(i % 1 == 0){
            time = (i + ':' + "00")
            slots[time] = {
                check : false,  // Rename to availible
                dissatisfaction : {}
            }
            arr.forEach(performance=>{
                slots[time].dissatisfaction[performance] = false;
            });
        }
        else{
            time = (i-(i%1) + ":" + Math.floor((i%1)*60));
            slots[time] = {
                check : false,
                dissatisfaction : {}
            }
            arr.forEach(performance=>{
                slots[time].dissatisfaction[performance] = false;
            });
        }
        i += interval;
    }
}

// TimeArray();

const dissatisfactionArray = [{performance : "A", time : ["5:00", "7:00"]}, {performance : "B", time : ["5:00", "7:00"]}, {performance : "D", time : ["5:00", "7:00"]}];

function dissatisfactionCreation(){
    dissatisfactionArray.forEach(problemSlot =>{
        problemSlot.time.forEach(problemTime =>{
            slots[problemTime].dissatisfaction[problemSlot.performance] = true;
        });
    });
}

// slots[time].dissatisfaction[problem] = true;

let finalSlots = [];

function slotCreation(){
    arrayCreation();
    TimeArray();
    dissatisfactionCreation(); // Rename to dissatisfactionMaping 
    finalSlots = [];
    arr.forEach(performanceName =>{
        for(let time in slots){
            if(!slots[time].check){
                const {count : performanceCount}  = performances.find(performance => performance.performanceName == performanceName);
                if((max > 5 && max - performanceCount > 1) || !slots[time].dissatisfaction[performanceName]){
                    performances.find(performance => performance.performanceName == performanceName).count++;
                    // console.log(performanceName + " -> " + time );
                    finalSlots.push({[performanceName] : time});
                    slots[time].check = true;
                    break;                
                }
            }
        }
    });

    temp.forEach(performanceName =>{
        for(let time in slots){
            if(!slots[time].check){
                if(!slots[time].dissatisfaction[performanceName]){
                    performances.find(performance => performance.performanceName == performanceName).count++;
                    // console.log(performance + " -> " + time );
                    finalSlots.push({[performanceName] : time});
                    slots[time].check = true;
                    break;                
                }
            }
        }
    });

    // A - 5 C D - 7      B - 6 E

    finalSlots.sort((a,b)=>{
        return Number(Object.values(a)[0] > Object.values(b)[0]) - 0.5;  
    })
};


let work = 0;
while(work < 10){
    slotCreation();
    console.log(arr, max);
    console.log(finalSlots);
    work++;
    console.log(performances);
}



//Read sort mdn 


// let i = 0
// while(i < 10){
//     slotCreation();
//     i++;
//     console.log(finalSlots);
//     // performances.forEach(performance => console.log(performance.count));
//     for(let performance in performances){
//         console.log(performances[performance].count);
//     }
//     finalSlots = [];
//     TimeArray();
// }




/*Flaws:
1. too much conflict = set an upper limit on the number of times slots are created
2. confict management = 8:30 sharp next day slots to be released.
    11:30 -  last conflict entry.
3. Manual overwrite - 
    1. if a slot is not available, then the user can manually overwrite the slot.
    
*/
