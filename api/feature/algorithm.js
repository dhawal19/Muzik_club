// //jshint esversion:6
// const performanceModel = require("../models/performancesDataModel");
// const slotModel = require("../models/slotModel");
// const feedbackModel = require("../models/feedbackModel");

// function createSlots() {
// let start = 5;
// let end = 8;

// const slots = {}; // delete DB every week, this obj is local to the program

// // const arr = ["A", "B", "C"];
// let arr = [];
// let temp = [];

// let max = -1;
// const performances = async () => {
//     try {
//         const performances = await performanceModel.find();
//         return performances;
//     } catch (err) {
//         console.log(err);
//     }
// };


// // pull performance from DB

// function arrayCreation(performances){
//     performances.sort((a,b) => {
//         return a.count - b.count;
//     });
//     arr = [];
//     temp = [];
//     let i = 0
//     performances.forEach(performance =>{
//         if(i < 3){ // push performances in the array according to the time intervals of the slots

//             arr.push(performance.performanceName);
//         }
//         else{
//             temp.push(performance.performanceName);
//         }
//         max = Math.max(max, performance.count);
//         i++;
//     });
// }

// function TimeArray(){
//     let interval = (end - start)/arr.length;
//     let i = start
//     while(i < end){
//         if(i % 1 == 0){
//             time = (i + ':' + "00")
//             slots[time] = {
//                 check : false,  // Rename to availible
//                 dissatisfaction : {}
//             }
//             arr.forEach(performance=>{
//                 slots[time].dissatisfaction[performance] = false;
//             });
//         }
//         else{
//             time = (i-(i%1) + ":" + Math.floor((i%1)*60));
//             slots[time] = {
//                 check : false,
//                 dissatisfaction : {}
//             }
//             arr.forEach(performance=>{
//                 slots[time].dissatisfaction[performance] = false;
//             });
//         }
//         i += interval;
//     }
// }

// // TimeArray();



// // const dissatisfactionArray = [{performance : "A", time : ["5:00", "7:00"]}, {performance : "B", time : ["5:00", "7:00"]}, {performance : "D", time : ["5:00", "7:00"]}];
// // db collection with performance name and an array to store start times of conflict slots
// const dissatisfactionArray = async () => {
//     try {
//         const feedback = await feedbackModel.find();
//         return feedback;
//     } catch (err) {
//         console.log(err);
//     }
// };

// function dissatisfactionCreation(){
//     dissatisfactionArray.forEach(problemSlot =>{
//         problemSlot.time.forEach(problemTime =>{
//             slots[problemTime].dissatisfaction[problemSlot.performance] = true;
//         });
//     });
// }

// // slots[time].dissatisfaction[problem] = true;

// let finalSlots = []; // local arrray

// function slotCreation(){
//     arrayCreation();
//     TimeArray();
//     dissatisfactionCreation(); // Rename to dissatisfactionMaping 
//     finalSlots = [];
//     arr.forEach(performanceName =>{
//         for(let time in slots){
//             if(!slots[time].check){
//                 const {count : performanceCount}  = performances.find(performance => performance.performanceName == performanceName);
//                 if((max > 5 && max - performanceCount > 1) || !slots[time].dissatisfaction[performanceName]){
//                     performances.find(performance => performance.performanceName == performanceName).count++;
//                     // console.log(performanceName + " -> " + time );
//                     finalSlots.push({[performanceName] : time});
//                     slots[time].check = true;
//                     break;                
//                 }
//             }
//         }
//     });

//     temp.forEach(performanceName =>{
//         for(let time in slots){
//             if(!slots[time].check){
//                 if(!slots[time].dissatisfaction[performanceName]){
//                     performances.find(performance => performance.performanceName == performanceName).count++;
//                     console.log(performance + " -> " + time );
//                     finalSlots.push({[performanceName] : time});
//                     slots[time].check = true;
//                     break;                
//                 }
//             }
//         }
//     });
//     slotCreation();
//     // A - 5 C D - 7      B - 6 E

//     finalSlots.sort((a,b)=>{
//         return Number(Object.values(a)[0] > Object.values(b)[0]) - 0.5;  
//     })
// };

// // loop through the final slots and push them to the DB as per the model
// finalSlots.forEach(async(slot) => {
//     const Slot = {
//         performanceName : Object.keys(slot)[0],
//         time : Object.values(slot)[0],
//         members : []
//     };
//     const newSlot = new slotModel(Slot);
//     await newSlot.save();

// });
// }

// module.exports = createSlots;

// // let work = 0;
// // while(work < 10){
// //     slotCreation();
// //     console.log(arr, max);
// //     console.log(finalSlots);
// //     work++;
// //     console.log(performances);
// // }



// //Read sort mdn 


// // let i = 0
// // while(i < 10){
// //     slotCreation();
// //     i++;
// //     console.log(finalSlots);
// //     // performances.forEach(performance => console.log(performance.count));
// //     for(let performance in performances){
// //         console.log(performances[performance].count);
// //     }
// //     finalSlots = [];
// //     TimeArray();
// // }




// /*Flaws:
// 1. too much conflict = set an upper limit on the number of times slots are created
// 2. confict management = 8:30 sharp next day slots to be released.
//     11:30 -  last conflict entry.
// 3. Manual overwrite - 
//     1. if a slot is not available, then the user can manually overwrite the slot.
//     
// */


const performanceModel = require("../models/performancesDataModel");
const slotModel = require("../models/slotModel");
const feedbackModel = require("../models/feedbackModel");

async function createSlots() {
  const start = 5;
  const end = 8;

  let slots = {}; // delete DB every week, this obj is local to the program

  let arr = [];
  let temp = [];
  let max = -1;

  const performances = await performanceModel.find();

  // pull performance from DB
  function arrayCreation(performances) {
    performances.sort((a, b) => {
      return a.count - b.count;
    });
    arr = [];
    temp = [];
    let i = 0;
    performances.forEach((performance) => {
      if (i < 3) {
        // push performances in the array according to the time intervals of the slots
        arr.push(performance.performanceName);
      } else {
        temp.push(performance.performanceName);
      }
      max = Math.max(max, performance.count);
      i++;
    });
  }

  function TimeArray() {
    let interval = (end - start) / arr.length;
    let i = start;
    while (i < end) {
      let time;
      if (i % 1 == 0) {
        time = i + ":" + "00";
        slots[time] = {
          check: false, // Rename to available
          dissatisfaction: {}
        };
        arr.forEach((performance) => {
          slots[time].dissatisfaction[performance] = false;
        });
      } else {
        time = i - (i % 1) + ":" + Math.floor((i % 1) * 60);
        slots[time] = {
          check: false,
          dissatisfaction: {}
        };
        arr.forEach((performance) => {
          slots[time].dissatisfaction[performance] = false;
        });
      }
      i += interval;
    }
  }

  const dissatisfactionArray = await feedbackModel.find();

  function dissatisfactionCreation() {
    dissatisfactionArray.forEach((problemSlot) => {
      problemSlot.time.forEach((problemTime) => {
        slots[problemTime].dissatisfaction[problemSlot.performance] = true;
      });
    });
  }

  function slotCreation() {
    arrayCreation(performances);
    TimeArray();
    dissatisfactionCreation(); // Rename to dissatisfactionMapping

    let finalSlots = []; // local array

    arr.forEach((performanceName) => {
      for (let time in slots) {
        if (!slots[time].check) {
          const performance = performances.find(
            (performance) => performance.performanceName === performanceName
          );
          const performanceCount = performance.count;
          if ((max > 5 && max - performanceCount > 1) || !slots[time].dissatisfaction[performanceName]) {
            performance.count++;
            finalSlots.push({ [performanceName]: time });
            slots[time].check = true;
            break;
          }
        }
      }
    });

    temp.forEach((performanceName) => {
      for (let time in slots) {
        if (!slots[time].check) {
          if (!slots[time].dissatisfaction[performanceName]) {
            const performance = performances.find(
              (performance) => performance.performanceName === performanceName
            );
            performance.count++;
            finalSlots.push({ [performanceName]: time });
            slots[time].check = true;
            break;
          }
        }
      }
    });

    finalSlots.sort((a, b) => {
      return Number(Object.values(a)[0] > Object.values(b)[0]) - 0.5;
    });

    // loop through the final slots and push them to the DB as per the model
    finalSlots.forEach(async (slot) => {
      const Slot = {
        performanceName: Object.keys(slot)[0],
        time: Object.values(slot)[0],
        members: []
      };
      const newSlot = new slotModel(Slot);
      await newSlot.save();
    });
  }

  slotCreation();

  // Call the function to start the slot creation process

  console.log("Slot creation process started.");
  performances.forEach(async (performance) => await performance.save());
}

module.exports = createSlots;

// Call the createSlots function to start the slot creation process
// createSlots();