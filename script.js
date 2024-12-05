let mainClockEle=document.getElementById("main-clock");
let seconds=new Date().getSeconds();
let minute=new Date().getMinutes();
let hour=new Date().getHours();
let alarmArr=[];
let setAlarmBtn=document.getElementById("set-alarm");
setAlarmBtn.addEventListener("click",()=>{
    let hour=document.getElementById("hour").value;
    let minute=document.getElementById("minute").value;
    let second=document.getElementById("second").value;
    let ampm=document.getElementById("meridiem").value;
    let alarmTime=`${hour}:${minute}:${second} ${ampm}`;
    let alarmLiEle=document.createElement("li");
    let alarmLihEle=document.createElement("h3");
    let alarmLiDivEle=document.createElement("div");
    let alarmLiBtnEle=document.createElement("button");
    alarmArr.forEach((element,index) => {
        if(element.time===alarmTime && alarmArr.length>0){
            alert("Alarm already set");
            return false;
        }else if(element.time!=alarmTime && index===alarmArr.length-1){
            alarmArr.push({"time":alarmTime,"id":"list-"+alarmArr.length});
            alarmLiEle.id=alarmArr[alarmArr.length-1].id;
            alarmLihEle.textContent=alarmTime;
            alarmLiEle.appendChild(alarmLihEle);
            alarmLiDivEle.setAttribute("class","dsms-alarm-btn-container");
            alarmLiBtnEle.setAttribute("role","button");
            alarmLiBtnEle.setAttribute("aria-label","dsmAlarm");
            alarmLiBtnEle.setAttribute("aria-describedby","dsmAlarm");
            alarmLiBtnEle.setAttribute("class","dsm-alarm");
            alarmLiBtnEle.setAttribute("id","dsm-alarm-"+(alarmArr.length-1));
            alarmLiBtnEle.innerHTML="Delete";
            alarmLiDivEle.appendChild(alarmLiBtnEle);
            alarmLiEle.appendChild(alarmLiDivEle);
            document.getElementById("alarm-list").appendChild(alarmLiEle);
            
            document.getElementById("dsm-alarm-"+(alarmArr.length-1)).addEventListener("click",(e)=>{
                alarmArr=alarmArr.filter((element,index)=>element.id!=e.target.parentNode.parentNode.id);
                document.getElementById("alarm-list").removeChild(document.getElementById(e.target.id).parentNode.parentNode);
            });
            return false;
        }
    });
    if(alarmArr.length===0){
        alarmArr.push({"time":alarmTime,"id":"list-"+alarmArr.length});
        alarmLiEle.id=alarmArr[alarmArr.length-1].id;
        alarmLihEle.textContent=alarmTime;
        alarmLiEle.appendChild(alarmLihEle);
        alarmLiDivEle.setAttribute("class","dsms-alarm-btn-container");
        alarmLiBtnEle.setAttribute("role","button");
        alarmLiBtnEle.setAttribute("aria-label","dsmAlarm");
        alarmLiBtnEle.setAttribute("aria-describedby","dsmAlarm");
        alarmLiBtnEle.setAttribute("class","dsm-alarm");
        alarmLiBtnEle.setAttribute("id","dsm-alarm-"+(alarmArr.length-1));
        alarmLiBtnEle.innerHTML="Delete";
        alarmLiDivEle.appendChild(alarmLiBtnEle);
        alarmLiEle.appendChild(alarmLiDivEle);
        document.getElementById("alarm-list").appendChild(alarmLiEle);
        document.getElementById("dsm-alarm-"+(alarmArr.length-1)).addEventListener("click",(e)=>{
            alarmArr=alarmArr.filter((element,index)=>element.id!=e.target.parentNode.parentNode.id);
            document.getElementById("alarm-list").removeChild(document.getElementById(e.target.id).parentNode.parentNode);
        });
    }
});
showClock(mainClockEle,hour,minute,seconds);
addZeroInput("hour");
addZeroInput("minute");
addZeroInput("second");
setInterval(() => {
    seconds=new Date().getSeconds();
    minute=new Date().getMinutes();
    hour=new Date().getHours();
    showClock(mainClockEle,hour,minute,seconds);
    if(alarmArr.length>0){
        console.log("alarmArr",alarmArr);
        alarmArr.forEach((element,index) => {
            // console.log(element.time);
            if(element.time===`${addZero(hour)}:${addZero(minute)}:${addZero(seconds)} ${getAmPm(hour)}`){
                alert("Alarm "+element.time);
            }
        });
    }
}, 1000);
function addZeroInput(idName=""){
    if(idName!==""){
        document.getElementById(idName).addEventListener("input",(e)=>{
            e.target.value=addZero(e.target.value);
        });
    }
}
function showClock(mainClockEle={},hour=0,minute=0,seconds=0){
    mainClockEle.textContent=`${addZero(getTwelveHrForm(hour))} : ${addZero(minute)} : ${addZero(seconds)}  ${getAmPm(hour)}`;
}
function addZero(num=0){
    // parseInt(num);
    // num.trimStart("0");
    num=parseInt(num);
    // (num<10)?console.log("addZero",'0'+num):console.log("addZero",`${num}`);
    return (num<10)?'0'+num:`${num}`;
}
function getTwelveHrForm(num=0){
    return num % 12 || 12;
}
function getAmPm(num=0){
   return num >= 12 ? 'PM' : 'AM';   
}