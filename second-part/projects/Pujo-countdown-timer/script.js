//defining all the months
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  //defining all the weekdays
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  //getting the remaining time text, deadline time container, expired time text
  const eventTimeInfo=document.querySelector(".time");
  const deadline=document.querySelector(".deadline");
  
  const expiredTimeText=document.querySelector(".expired");
  
  //getting the event date
  const eventDate=new Date(2023,9,20,0,0,0);
  // new Date(year,month,date,hours,mins,secs)
  
  // getting the weekday, date, month, year
  const weekday=weekdays[eventDate.getDay()];
  const date=eventDate.getDate();
  const month=months[eventDate.getMonth()];
  const year = eventDate.getFullYear();

  
  //showing the giveaway time info
 eventTimeInfo.textContent=`Waiting Ends On ${weekday} , ${date} ${month} ${year}`

  
  
  //function to get the remaining time
  function getRemainingTime(){
  
  const currentDate=new Date();
  const currentTime=currentDate.getTime()
  const eventTime=eventDate.getTime();
  
  const remainingTime=eventTime-currentTime;
  
  
  const counterDays=document.querySelector(".days>h3"), counterHours=document.querySelector(".hours>h3"), counterMins=document.querySelector(".mins>h3"), counterSecs=document.querySelector(".secs>h3")
  
  //converting a day, hour, minute and second in miliseconds
  const oneDay=24*60*60*1000;
  const oneHour=60*60*1000;
  const oneMin=60*1000;
  const oneSec=1000;
  
  const remainingDays=Math.floor(remainingTime/oneDay);
  const remainingHours=Math.floor((remainingTime%oneDay)/oneHour);
  const remainingMins=Math.floor((remainingTime%oneHour)/oneMin);
  const remainingSecs=Math.floor((remainingTime%oneMin)/oneSec);
  
  // console.log(`${remainingDays} days, ${remainingHours} hours, ${remainingMins} mins , ${remainingSecs} secs`)
  
  
  function updateCounter(){
    counterDays.textContent=remainingDays<10?`0${remainingDays}`:remainingDays;
    counterHours.textContent=remainingHours<10?`0${remainingHours}`:remainingHours;
    counterMins.textContent=remainingMins<10?`0${remainingMins}`:remainingMins;
    counterSecs.textContent=remainingSecs<10?`0${remainingSecs}`:remainingSecs;
  }
  
  updateCounter();
  
  if(remainingTime<0){
    clearInterval(countDown);
  expiredTimeText.classList.remove("hidden")
  }
  
  }
  
  //getting the time every 1 second
  let countDown=setInterval(getRemainingTime,1000);