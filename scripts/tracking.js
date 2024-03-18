function updateEarthIlumination(timestamp){
        //Time unit conversion to compute Earth's ilumination:
      // returns [year, month, day, hour, minutes]
      ymdhm = timestampToArray(timestamp);
      // Computing and updating Earth's ilumination:
      updateSunlightDirection(ymdhm);
}

function updateDataDisplay(current_state){

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

  document.getElementById("name").value = current_state[0];
  document.getElementById("id").value = current_state[1];
  document.getElementById("latitude").value = current_state[2];
  document.getElementById("longitude").value = current_state[3];
  document.getElementById("altitude").value = current_state[4];
  document.getElementById("velocity").value = current_state[5];
  document.getElementById("visibility").value = current_state[6];
  document.getElementById("footprint").value = current_state[7];
  document.getElementById("date-panel").value = current_state[8];
  // document.getElementById("daynum").value = current_state[9];
  document.getElementById("solar-latitude").value = current_state[10];
  document.getElementById("solar-longitude").value = current_state[11];
  // document.getElementById("units").value = current_state[12];

}



function fetchPreviousStates(object_previous_path, number_of_positions, query_rate){
    
  function fetchRecursively(object_previous_path, current_time, number_of_positions, query_rate){
    
    if (number_of_positions < 1) {
      updateMap([[object_previous_path, 1]]);
      updateObjectPosition(object_previous_path);
      updateNationalFlagPosition(object_previous_path); 
      document.getElementById("satellite").style.opacity = 1;
      document.getElementById("visibility-radius").style.opacity = 1;
      document.getElementById("satellite-location-flag").style.opacity = 1;
      document.getElementById("satellite-location-name").style.opacity = 1;
      return
    }
    // https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892&units=miles
    fetch("https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=" + current_time + "&units=" + units[0])
    .then((response) => response.json())
    .then((data) => {
      
      // Signal that fetching process is happening:
      activityLogging("tracing past locations");

      // Updates Earth's ilumination state (so far only for the 3D view):
      updateEarthIlumination(Number(data[0].timestamp));

      //Time unit conversion to display on the date panel:
      let time =  timestampToDateConversion(Number(data[0].timestamp));
      
      
      let current_state = [data[0].name, data[0].id, data[0].latitude, data[0].longitude, data[0].altitude, data[0].velocity, data[0].visibility, data[0].footprint, time, data[0].daynum, data[0].solar_lat, data[0].solar_lon, data[0].units];
      object_previous_path.push(current_state);
      updateDataDisplay(current_state);
      updateMap([[object_previous_path, 1]]);
      updateObjectPosition(object_previous_path);
      updateNationalFlagPosition(object_previous_path); 
      
      setTimeout(() => {
        fetchRecursively(object_previous_path, Number(current_time)+previous_path_step, number_of_positions-1, query_rate);
      }, query_rate);
      
    });
    
  }
  
  let current_time = Date.now().toString().slice(0,-3);
  fetchRecursively(object_previous_path, current_time - (number_of_positions-1)*previous_path_step, number_of_positions, query_rate);
  
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

  // https://api.wheretheiss.at/v1/satellites/25544?units=miles
  fetch("https://api.wheretheiss.at/v1/satellites/25544" + "?units=" + units[0])
  .then((response) => response.json())
  .then((data) => {

    // Signal that fetching process is happening:
    activityLogging("updating parameters");
    
      
    // Updates Earth's ilumination state (so far only for the 3D view):
    updateEarthIlumination(Number(data.timestamp));

    //Unit conversion:
    let time =  timestampToDateConversion(Number(data.timestamp));
    
    let current_state = [data.name, data.id, data.latitude, data.longitude, data.altitude, data.velocity, data.visibility, data.footprint, time, data.daynum, data.solar_lat, data.solar_lon, data.units];
    
    updateDataDisplay(current_state);
    object_path.push(current_state);
    
    
  });
  
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

        fetch("https://api.wheretheiss.at/v1/coordinates/" + user_location[0] + "," + user_location[1])
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