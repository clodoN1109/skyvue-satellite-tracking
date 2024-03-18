function updateWikiInfo(){

  let info1 = "The International Space Station (ISS) is the largest modular space station currently in low Earth orbit.";
  let info2 = "The first ISS component was launched in 1998, and the first long-term residents arrived on 2 November 2000 after being launched from the Baikonur Cosmodrome on 31 October 2000."
  let info3 ="The ISS orbital period is about 90 minutes.";
  let info4 ="The station is divided into two sections: the Russian Orbital Segment (ROS) is operated by Russia, while the United States Orbital Segment (USOS) is run by the United States as well as by the other states.";
  let info5 = " As of April 2022, 251 astronauts, cosmonauts, and space tourists from 20 different nations have visited the space station, many of them multiple times.";
  let infoList = [info1, info2, info3, info4, info5];

  document.getElementsByClassName("wikiInfo")[0].textContent = infoList[Math.floor(Math.random() * infoList.length)];
  
}

function updateUnits(event){

  units[0] = (event.target.value).toLowerCase();
  
}
  
function timestampToDateConversion(timestamp){

  const utcSeconds = timestamp; // Example epoch time in seconds
  const date = new Date(0); // The 0 sets the date to the epoch
  date.setUTCSeconds(utcSeconds);
  date.toGMTString()+"<br>"+date.toLocaleString();  

  return date;

}

function timestampToArray(timestamp) {

  const utcSeconds = timestamp; // Example epoch time in seconds
  const date = new Date(0); // The 0 sets the date to the epoch
  date.setUTCSeconds(utcSeconds);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minutes = date.getUTCMinutes();
 
  timeArray = [year, month, day, hour, minutes];

  return timeArray;
}

function copyCoordinates(){

  let copyInfo = document.getElementById("latitude").value + ", " +
  document.getElementById("longitude").value  + ", " +
  document.getElementById("altitude").value + ", " +
  document.getElementById("time").value;


  navigator.clipboard.writeText(copyInfo);

  alert("Copied the coordinates: " + copyInfo);

}

function exportData(){}

// const selectElement = document.getElementById("mySelect");
// const selectedValue = selectElement.value;
// const selectedText = selectElement.tabs[selectElement.selectedIndex].text;

// Making an element A inherit the height value from an element B .
function makeSameHeightByID(elementA_id, elementB_id){
  
  const sourceValue = document.getElementById(elementB_id).clientHeight;
  document.getElementById(elementA_id).style.height = sourceValue + "px";

}

// window.addEventListener('load', function() {
//   document.querySelector('.loader').style.display = 'none';
// });

function activityLogging(activityLog){

  document.getElementById("log").textContent = activityLog;
  document.getElementById("log").style.transition = "all 0s";
  document.getElementById("log").style.opacity = 1;

  document.getElementById("log-loader").style.borderTopColor = "#ffffff";
  document.getElementById("log-loader").style.animation = "spin 0.1s linear infinite";
 
  
  setTimeout(() => {

    document.getElementById("log-loader").style.borderTopColor = "#f3f3f3a0";
    document.getElementById("log-loader").style.animation = "spin 0.1s linear infinite";
    
    document.getElementById("log").style.transition = "all 2s";
    document.getElementById("log").style.opacity = 0;
    
  }, 1000);
  
}