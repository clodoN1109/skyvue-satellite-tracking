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

  mountedApp.units = (event.target.value).toLowerCase();

  distance_unit_elements =  document.getElementsByClassName('distance-unit');
  velocity_unit_elements =  document.getElementsByClassName('velocity-unit');;

  if (mountedApp.units === 'miles') {

    for (let index = 0; index < distance_unit_elements.length; index++) {
      distance_unit_elements[index].textContent = "miles";
    }

    for (let index = 0; index < velocity_unit_elements.length; index++) {
      velocity_unit_elements[index].textContent = "mph";
    }

  } else {
    if (mountedApp.units = 'kilometers') {

      for (let index = 0; index < distance_unit_elements.length; index++) {
        distance_unit_elements[index].textContent = "Km";
      }

      for (let index = 0; index < velocity_unit_elements.length; index++) {
        velocity_unit_elements[index].textContent = "km/h";
      }
  
    }
  }

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

  }, loader_time);
  
}

function showUserLocation(user_location){
  
  // Check if geolocation is supported by the browser
  if ("geolocation" in navigator) {
    // Prompt the user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        // Get the user's latitude and longitude coordinates
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        user_location[0] = latitude;
        user_location[1] = longitude;
        
        //Unit conversions, scaling and positional adjustments:
        user_picture_width = Number(document.getElementById("user-location").offsetWidth); 
        userY = (Number(latitude) - 90)*(-2.2222) - user_picture_width/2;
        userX = (Number(longitude) + 180)*(2.2222) - user_picture_width/2;
        
        document.getElementById("user-location").style.transform = "translate(" + userX + "px, " + userY +  "px)";
        document.getElementById("user-location").style.opacity = 1;

        fetch(source_URL + "v1/coordinates/" + user_location[0] + "," + user_location[1])
        .then((response) => response.json())
        .then((iss) => {
          
          let country_code = iss.country_code;
          // country_code = 'BR';
          
          document.getElementById("user-location-name").textContent = country_code;
          let flagURL = "https://flagsapi.com/" + country_code + "/shiny/64.png";
          document.getElementById("user-location-flag").src = flagURL;
          
          user_picture_width = Number(document.getElementById("user-location").offsetWidth);
          positionY = (Number(latitude) - 90)*(-2.2222);
          positionX = (Number(longitude) + 180)*(2.2222);
          
          document.getElementById("user-location-flag").style.transform = "translate(" + (positionX - user_picture_width/2 -8) + "px, " + (positionY - user_picture_width/2 - 10) +  "px)";
          document.getElementById("user-location-name").style.transform = "translate(" + (positionX + 10) + "px, " + (positionY + 10) +  "px)";
          
        });

      },
      // Error callback
      (error) => {
        // Handle errors (e.g., if the user denied location sharing permissions)
        console.error("Error getting user location:", error);
      }
      );
  } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
  }
    
}

function gradualOpacity(className, timeToAppear){

  elementsOfClass = document.getElementsByClassName(className);
 
  for (let index = 0; index < elementsOfClass.length; index++) {
  
    elementsOfClass[index].style.transition = 'opacity 0s'; 
    elementsOfClass[index].style.opacity = 0;
      
  }
 
  setTimeout(() => {
    
  for (let index = 0; index < elementsOfClass.length; index++) {
  
    elementsOfClass[index].style.transition = 'opacity 3s'; 
    elementsOfClass[index].style.opacity = 1;
      
  }
  }, timeToAppear);
  
}

function map2DGradualAppearance(timeToAppear){

  setTimeout(() => {
    document.getElementById('map2D-container').style.transition = 'height 1.5s';  
    document.getElementById('map2D-container').style.height = '400px';  

    setTimeout(() => {
      showUserLocation(user_location);
    }, 3000);
  }, timeToAppear);
  
}

