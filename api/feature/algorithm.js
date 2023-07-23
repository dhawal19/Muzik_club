// /*Flaws:
// 1. Too much conflict = set an upper limit on the number of times slots are created
// 2. conflict management = 8:30 sharp next day slots to be released.
//     11:30 -  last conflict entry.
// 3. Manual overwrite - 
//     1. If a slot is unavailable, the user can manually overwrite the slot.
//     
// */


const performanceModel = require("../models/performancesDataModel");
const slotModel = require("../models/slotModel");
const feedbackModel = require("../models/feedbackModel");

async function createSlots() {
  const start = 5;
  const end = 8;

  let slots = {}; // delete DB every week; this obj is local to the program

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
