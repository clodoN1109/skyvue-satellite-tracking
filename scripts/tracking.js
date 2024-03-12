function signalFetchingEvent(){
  
  document.getElementById("sign").style.backgroundImage = 
  'linear-gradient(0deg, rgb(94, 94, 255), rgb(94, 94, 255))';
  document.getElementById("fetchWarning").style.color = 'white';
  
  setTimeout(() => {
    
    document.getElementById("sign").style.backgroundImage = '';
    document.getElementById("fetchWarning").style.color = 'white';
    
  },3000);
  
}

function updateDataDisplay(current_state){
  document.getElementById("latitude").value = current_state[0];
  document.getElementById("longitude").value = current_state[1];
  document.getElementById("altitude").value = current_state[2];
  document.getElementById("velocity").value = current_state[3];
  document.getElementById("date-painel").value = current_state[4];
}

function fetchData(iss_path){
  
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
  .then((iss) => {
    
    // Signal that fetching process is happening:
    signalFetchingEvent();
    
    //Unit conversion:
    let time =  timestampToDateConversion(Number(iss.timestamp));
    
    current_state = [iss.latitude, iss.longitude, iss.altitude, iss.velocity, time];
    
    updateDataDisplay(current_state);
    iss_path.push(current_state);
    
    
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