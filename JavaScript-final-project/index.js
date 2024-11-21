'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

// Your code here

const questions = Object.keys(mockData[0]);
//const emptyProfile = {questions}
//console.log(emptyProfile);
const minimumAge = 18;
const newProfile = {};

// ----- Here We make a new profile, based on the Objects.keys from mocData.js and combining it with prompted answers. ----- 
for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionToAks = `What is your ${question.replaceAll("_", " ")}? --> `;
    const answer = prompt(`${questionToAks}`);
    newProfile[`${question}`] = `${answer}`;
    let minAgeInterest = "";
    let maxAgeInterest = "";
    // ----- Here I differenciate actions based on the per question asked. ----- 
    if (i === 0 || i === 1) {
        if (answer.length <= 1) {
            console.log( "Your answer is too short. Try again.");
            i--;
        }
    }
    if (Number(answer) < minimumAge && i === 2) {
        console.log( "You are too young. Please return when you are 18 years or older.");
        break; 
        } 
    if (i === 3) {
        if (answer === "M" || answer === "F" || answer === "X" ) {
        } else {
            console.log( "Your answer is invalide. Try again. Please select 'M' for male, 'F' for female or 'X' for other.");
            i--;
        }
    }
    if (i === 4) {
        if (answer === "M" || answer === "F" || answer === "B" ) {
        } else {
            console.log( "Your answer is invalide. Try again. Please select 'M' for male, 'F' for female or 'B' for both.");
            i--;
        }
    }
    if (i === 5) {
        if (answer === "city" || answer === "rural") {
        } else {console.log( "Your answer is invalide. Try again. Please select 'city' or 'rural'. ");
        i--;
        }
    }
    if (i === 6 && Number(answer) < minimumAge ) { 
        maxAgeInterest = "";
        minAgeInterest = "";
        console.log( "We only have adult members, try again and/or seek help with a therapist.");
        i--;
    }

    minAgeInterest = newProfile.min_age_interest;
    maxAgeInterest = newProfile.max_age_interest;

    if (i === 7 && Number(minAgeInterest) >= Number(maxAgeInterest)) {
        console.log(`${minAgeInterest} is greater then ${maxAgeInterest}. Let's try again`);
        maxAgeInterest = ""; // Taking in concern that someone might have swapped minumum for maximum, both the minimum- and maximum values are to be filled in again.
        minAgeInterest = "";
        i= i-2;
    }
}
//------ We have created a new profile. In the code below, this can be reviewed  ------ 
/* 
console.log("New profile:");
console.log(newProfile);
*/

//  ----- The data below was yesed fot testing.  ----- 
/*
let testingProfile = {
    first_name: 'Lin',
    last_name: 'Fun',
    age: '36',
    gender: 'F',
    gender_interest: 'M',
    location: 'rural',
    min_age_interest: '19',
    max_age_interest: '99'
  }
*/
//  ----- Here we find and collect matches from mockData.js, based on certain conditions.  ----- 
const matches = []

for (let i=0; i < mockData.length;i++) {
    if ((newProfile.gender_interest === "B" 
        || newProfile.gender_interest === mockData[i].gender)
        && (newProfile.gender === mockData[i].gender_interest 
        || mockData[i].gender_interest === "B")
        && (Number(mockData[i].age) >= Number(newProfile.min_age_interest) 
        && Number(mockData[i].age) <= Number(newProfile.max_age_interest))
        && (Number(newProfile.age) <= Number(mockData[i].max_age_interest) 
        && Number(newProfile.age) >= Number(mockData[i].min_age_interest))
        && mockData[i].location === newProfile.location) {
            const matchInformation = mockData[i];
            matches.push(matchInformation);
        } 
    }

// ----- Here we display the results  ----- 
console.log("Matches:"); // We tell the reader what they are looking at.
console.log(`You have ${matches.length} matches.`); // This total amount of matches appended/pushed in the array "matches".

//  ----- We loop through the results to display certain information in a understandable way. ----- 
for (let i=0; i < matches.length;i++) {
    let pronouns = ""; // The way we adress the match depends on gender
    let toLive = "lives"; // pronounces "they/them" use the ploural form of verbs.
    let match = matches[i];
    let gender = ""; // The gender is logged as "M", "F", "X", but should be displayed differently.
    const humanIndex = i+1; // JS starts counting an array or string starting at "0", but the way we count as humans, we start as 1. 
    //  -----  Her we diferenciate the text used for gender, pronounce and apply the right verbs.  ----- 
    if (match.gender === "M") {
        pronouns = "He";
        gender = "male";
    }    
    if (match.gender === "F") {
        pronouns = "She";
        gender = "female";
    }
    if (match.gender === "X") {
        pronouns = "They";
        toLive = "live";
        gender = "something other then (just) male or female";
    }
    //  ----- Time to print the final results in the terminal ----- 
        console.log(`Match number ${humanIndex} : ${match.first_name} ${match.last_name} is ${match.age} years old. ${pronouns} identifies as ${gender}. ${pronouns} ${toLive} in the ${match.location} area.`);
    }
