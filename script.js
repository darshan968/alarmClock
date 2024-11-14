import addZero from "./helpers.js";

let today=new Date();
let hours=today.getHours();
let minutes=today.getMinutes();
let seconds=today.getSeconds();
let mainCLock=document.getElementById('main-clock');
let alarmArr=[];
setInterval(() => {
    seconds++;
    if(seconds==60){
        seconds=0;
        minutes++;
    }
    if(minutes==60){
        minutes=0;
        hours++;
    }
    mainCLock.innerHTML=`<span>${addZero(hours)}</span><span>:</span><span>${addZero(minutes)}</span><span>:</spam><span>${addZero(seconds)}</span>`;
},1000);


// script.js

// Select elements
const openAlertButton = document.getElementById('get-alarm-block-btn');
const modal = document.getElementById('input-alert-modal');
const closeAlertButton = document.getElementById('close-alert');
const submitInputButton = document.getElementById('submit-input');
const userInput = document.getElementById('set-alarm-clock');

// Open the modal
openAlertButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeAlertButton.addEventListener('click', () => {
    modal.style.display = 'none';
    userInput.value = ''; // Clear input
});

// Close the modal if clicked outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        userInput.value = ''; // Clear input
    }
});

// Handle input submission
submitInputButton.addEventListener('click', () => {
    const inputText = userInput.value.trim();
    if (inputText) {
        alert(`You entered: ${inputText}`);
    } else {
        alert("Please enter something.");
    }
    modal.style.display = 'none';
    userInput.value = ''; // Clear input after submission
});
