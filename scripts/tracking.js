function resetInterface(){

    // Reset output variables, intervals and canvas.
    
  intervals.forEach(element => { 
    clearInterval(element);    
  });
  
  setTimeout(() => {
    intervals.length = 0;
  }, 1000);

  const ctx = canvas.getContext("2d");
  if (ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
  object_previous_path.length = 0;
  object_path.length = 0;
  document.getElementById('satellite').style.opacity = 0; 
  document.getElementById('satellite-location-name').style.opacity = 0; 
  document.getElementById('satellite-location-flag').style.opacity = 0; 
  document.getElementById('visibility-radius').style.opacity = 0; 

  //Cleaning the Data Manager.
  let table = document.getElementById('data-table');
  let data_row_containers = table.getElementsByClassName('data-row-container'); 
  while (data_row_containers.length > 1){
    data_row_containers[1].remove();
  }

  // Cleaning all interface output fields.
  document.getElementById('source-meta').textContent = '';
  document.getElementById('name-meta').textContent = '';
  document.getElementById('id-meta').textContent = '';
  document.getElementById('units-meta').textContent = '';
  document.getElementById('rows-meta').textContent = '';
  document.getElementById('columns-meta').textContent = '';

  document.getElementById("name").value = '';
  document.getElementById("id").value = '';
  document.getElementById("latitude").value = ''; 
  document.getElementById("longitude").value = '';  
  document.getElementById("altitude").value = ''; 
  document.getElementById("velocity").value = ''; 
  document.getElementById("visibility").value = ''; 
  document.getElementById("footprint").value = ''; 
  document.getElementById("date-panel").value = ''; 
  // document.getElementById("daynum").value = ''; 
  document.getElementById("solar-latitude").value = ''; 
  document.getElementById("solar-longitude").value = ''; 
  // document.getElementById("units").value = ''; 

}

function startTracking(event){

  resetInterface();
  if (event.target.value === 'reset'){
    return
  }

  let object_ID = event.target.value;
  object_ID = object_ID.substring(object_ID.indexOf('-') + 1, object_ID.length);

  fetchPreviousStates(object_previous_path, number_of_previous_positions, previous_states_update_rate);

  // Starts data display update asynchronous loop.
  setTimeout(() => {

      // Starts data collection asynchronous loop.
      const interval_UpdateData = setInterval(() => {

          fetchCurrentState(object_path);  

      }, data_update_rate);

      const interval_UpdateDataDisplay = setInterval(() => {

          // Parameter to cut avoid ploting points immediately  bellow the satellite's figure,
          // and responsive to the selected value for the data_update_rate parameter.

          updateMap([[object_previous_path, 100], [object_path.slice(0, -3), line_level_detail]]); 
          updateObjectPosition(object_path);
          updateNationalFlagPosition(object_path);

      }, display_framerate);

      intervals = [interval_UpdateData, interval_UpdateDataDisplay];

  }, (number_of_previous_positions) * previous_states_update_rate);
    
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
      updateMap([[object_previous_path, 100]]);
      updateObjectPosition(object_previous_path);
      updateNationalFlagPosition(object_previous_path); 
      document.getElementById("satellite").style.opacity = 1;
      document.getElementById("visibility-radius").style.opacity = 1;
      document.getElementById("satellite-location-flag").style.opacity = 1;
      document.getElementById("satellite-location-name").style.opacity = 1;
      return
    }
    // https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892&units=miles
    fetch(source_URL + "v1/satellites/25544/positions?timestamps=" + current_time + "&units=" + units[0])
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
      updateMap([[object_previous_path, 100]]);
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
  fetch(source_URL + "v1/satellites/25544" + "?units=" + units[0])
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
    updateDataManager(object_path);
    
  });
  
}

