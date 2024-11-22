let mainClockEle=document.getElementById("main-clock");
let seconds=new Date().getSeconds();
let minute=new Date().getMinutes();
let hour=new Date().getHours();
mainClockEle.textContent=`${addZero(getTwelveHrForm(hour))} : ${addZero(minute)} : ${addZero(seconds)}  ${getAmPm(hour)}`;
setInterval(() => {
    let seconds=new Date().getSeconds();
    let minute=new Date().getMinutes();
    let hour=new Date().getHours();
    mainClockEle.textContent=`${addZero(getTwelveHrForm(hour))} : ${addZero(minute)} : ${addZero(seconds)}  ${getAmPm(hour)}`;
    
}, 1000);
function addZero(num=0){
    return (num<10)?`0${num}`:`${num}`;
}
function getTwelveHrForm(num=0){
    return num % 12 || 12;
}
function getAmPm(num=0){
   return num >= 12 ? 'PM' : 'AM';   
}