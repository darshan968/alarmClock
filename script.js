// Author: Darshan Deshmukh
// Created On: 5th December 2024
let mainClockEle=document.getElementById("main-clock");
let seconds=new Date().getSeconds();
let minute=new Date().getMinutes();
let hour=new Date().getHours();
let alarmArr=[];
let setAlarmBtn=document.getElementById("set-alarm");
// set alarm
setAlarmBtn.addEventListener("click",()=>{
    let hour=document.getElementById("hour").value;
    let minute=document.getElementById("minute").value;
    let second=document.getElementById("second").value;
    let ampm=document.getElementById("meridiem").value;
    let alarmTime=`${hour}:${minute}:${second} ${ampm}`;
    alarmArr.forEach((element,index) => {
        if(element.time===alarmTime && alarmArr.length>0){
            // checking already set alarm
            alert("Alarm already set");
            return false;
        }else if(element.time!=alarmTime && index===alarmArr.length-1){
            // if not set then set alarm
            alarmArr.push({"time":alarmTime,"id":"list-"+alarmArr.length});
            createAlarmElement(alarmTime, "list-" + (alarmArr.length - 1));
            return false;
        }
    });
    if(alarmArr.length===0){
        // setting the alarm initially
        alarmArr.push({"time":alarmTime,"id":"list-"+alarmArr.length});
        createAlarmElement(alarmTime, "list-" + (alarmArr.length - 1));
    }
});
// initial clock
showClock(mainClockEle,hour,minute,seconds);
// clock update
addZeroInput("hour");
addZeroInput("minute");
addZeroInput("second");
setInterval(() => {
    seconds=new Date().getSeconds();
    minute=new Date().getMinutes();
    hour=new Date().getHours();
    showClock(mainClockEle,hour,minute,seconds);
    if(alarmArr.length>0){
        alarmArr.forEach((element,index) => {
            if(element.time===`${addZero(getTwelveHrForm(hour))}:${addZero(minute)}:${addZero(seconds)} ${getAmPm(hour)}`){
                alert("Alarm "+element.time);
            }
        });
    }
}, 1000);
/*
    add zero to single digit number
    start
*/
function addZeroInput(idName=""){
    if(idName!==""){
        document.getElementById(idName).addEventListener("input",(e)=>{
            e.target.value=addZero(e.target.value);
        });
    }
}
/*
    add zero to single digit number
    end
*/
/*
    show clock
    start
*/
function showClock(mainClockEle={},hour=0,minute=0,seconds=0){
    mainClockEle.textContent=`${addZero(getTwelveHrForm(hour))} : ${addZero(minute)} : ${addZero(seconds)}  ${getAmPm(hour)}`;
}
/*
    show clock
    end
*/
/*
    add zero to single digit number
    start
*/
function addZero(num=0){
    num=parseInt(num);
    return (num<10)?'0'+num:`${num}`;
}
/*
    add zero to single digit number
    end
*/
/*
    get 12 hr format
    start
*/
function getTwelveHrForm(num=0){
    return num % 12 || 12;
}
/*
    get 12 hr format
    end
*/
/* 
    get AM or PM
    start
*/
function getAmPm(num=0){
   return num >= 12 ? 'PM' : 'AM';   
}
/* 
    get AM or PM
    end
*/
/*  
    creating alarm element
    start
*/
function createAlarmElement(alarmTime, alarmId) {
    let alarmLiEle = document.createElement("li");
    let alarmLihEle = document.createElement("h3");
    let alarmLiDivEle = document.createElement("div");
    let alarmLiBtnEle = document.createElement("button");

    alarmLiEle.id = alarmId;
    alarmLihEle.textContent = alarmTime;
    alarmLiEle.appendChild(alarmLihEle);
    alarmLiDivEle.setAttribute("class", "dsms-alarm-btn-container");
    alarmLiBtnEle.setAttribute("role", "button");
    alarmLiBtnEle.setAttribute("aria-label", "dsmAlarm");
    alarmLiBtnEle.setAttribute("aria-describedby", "dsmAlarm");
    alarmLiBtnEle.setAttribute("class", "dsm-alarm");
    alarmLiBtnEle.setAttribute("id", "dsm-alarm-" + alarmId.split('-')[1]);
    alarmLiBtnEle.innerHTML = "Delete";
    alarmLiDivEle.appendChild(alarmLiBtnEle);
    alarmLiEle.appendChild(alarmLiDivEle);
    document.getElementById("alarm-list").appendChild(alarmLiEle);

    document.getElementById("dsm-alarm-" + alarmId.split('-')[1]).addEventListener("click", (e) => {
        alarmArr = alarmArr.filter((element) => element.id != e.target.parentNode.parentNode.id);
        document.getElementById("alarm-list").removeChild(document.getElementById(e.target.id).parentNode.parentNode);
    });
}
/*  
    creating alarm element
    end
*/