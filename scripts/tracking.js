function signalFetchingEvent(){
  
  document.getElementById("sign").style.backgroundImage = 
  'linear-gradient(0deg, rgb(255, 255, 255), rgb(255, 255, 255))';

  setTimeout(() => {
    
    document.getElementById("sign").style.backgroundImage = '';
    
  },3000);
  
}
 
function updateDataDisplay(current_state){
  document.getElementById("latitude").value = current_state[0];
  document.getElementById("longitude").value = current_state[1];
  document.getElementById("altitude").value = current_state[2];
  document.getElementById("velocity").value = current_state[3];
  document.getElementById("date-painel").value = current_state[4];
}

function drawPreviousStates(object_path, number_of_positions){

  // https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles

  function fetchRecursively(object_path, current_time, number_of_positions){

    console.log("number_of_positions: " + number_of_positions);
    
    if (number_of_positions < 1) {
      console.log("entrei");
      console.log("object_path" + object_path);
      drawPoints(object_path); 
      updateObjectPosition(object_path);
      setNationalFlag(object_path);
      document.getElementsByClassName("satellite")[0].style.opacity = 1;
      return
    }
  
    fetch("https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=" + current_time)
    .then((response) => response.json())
    .then((data) => {
  
      // Signal that fetching process is happening:
      signalFetchingEvent();
      
      //Unit conversion:
      let time =  timestampToDateConversion(Number(data.timestamp));
      
      let current_state = [data[0].latitude, data[0].longitude, data[0].altitude, data[0].velocity, time];
      updateDataDisplay(current_state);
      object_path.unshift(current_state);
      drawPoints(object_path); 

      setTimeout(() => {
        fetchRecursively(object_path, Number(current_time)-100, number_of_positions-1);
      }, 1000);
      
    });

  }

  fetchRecursively(object_path, Date.now().toString().slice(0,-3), number_of_positions);

}

function fetchCurrentState(object_path){
  
  // Json response object example: 
  //   {
  //     "name": "iss",
  //     "id": 25544,
  //     "latitude": 50.11496269845,
  //     "longitude": 118.07900427317,
  //     "altitude": 408.05526028199,
  //     "velocity": 27635.971970874,
  //     "visibility": "daylight",
  //     "footprint": 4446.1877699772,
  //     "timestamp": 1364069476,
  //     "daynum": 2456375.3411574,
  //     "solar_lat": 1.3327003598631,
  //     "solar_lon": 238.78610691196,
  //     "units": "kilometers"
  // }
  
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
  .then((response) => response.json())
  .then((data) => {
    
    // Signal that fetching process is happening:
    signalFetchingEvent();
    
    //Unit conversion:
    let time =  timestampToDateConversion(Number(data.timestamp));
    
    let current_state = [data.latitude, data.longitude, data.altitude, data.velocity, time];
    
    updateDataDisplay(current_state);
    object_path.push(current_state);
    
    
  });
  
}

function showUserLocation(){
  
  // Check if geolocation is supported by the browser
  if ("geolocation" in navigator) {
    // Prompt the user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        // Get the user's latitude and longitude coordinates
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        //Unit conversions, scaling and positional adjustments:
        user_picture_width = Number(document.getElementsByClassName("user-location")[0].width); 
        latitude = (Number(latitude) - 90)*(-2.2222) - user_picture_width/2;
        longitude = (Number(longitude) + 180)*(2.2222) - user_picture_width/2;
        
        document.getElementsByClassName("user-location")[0].style.transform = "translate(" + longitude + "px, " + latitude +  "px)";
        document.getElementsByClassName("user-location")[0].style.opacity = 1;
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