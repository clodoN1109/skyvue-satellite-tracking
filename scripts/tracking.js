function resetInterface(){

    // Reset output variables, intervals, timeouts and canvas.

  timeouts.forEach(element => { 
    clearTimeout(element);    
  });

  intervals.forEach(element => { 
    clearInterval(element);    
  });
  
  setTimeout(() => {
    intervals.length = 0;
    timeouts.length = 0;
  }, 1000);

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
  object_path.length = 0;

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
  document.getElementById("time").value = ''; 
  // document.getElementById("daynum").value = ''; 
  document.getElementById("solar-latitude").value = ''; 
  document.getElementById("solar-longitude").value = ''; 
  // document.getElementById("units").value = ''; 

  setTimeout(() => {
    mountedApp.tracking = false;  
  }, 500);
  

}

function stopTracking( ){
  resetInterface();
}

function selectSatellite(event) {
  
  resetInterface();
  mountedApp.selected_satellite = event.target.value;

}

function startTracking(norad_number){

  fetchCurrentState(norad_number, object_path);  

  // Starts data collection asynchronous loop.
  const interval_UpdateData = setInterval(() => {

    fetchCurrentState(norad_number, object_path);  

  }, data_update_rate);

  const interval_UpdateDataDisplay = setInterval(() => {

    // Parameter to cut avoid ploting points immediately  bellow the satellite's figure,
    // and responsive to the selected value for the data_update_rate parameter.

    updateMap([[object_path.slice(0, -3), line_level_detail]]); 
    updateObjectPosition(object_path);
    updateNationalFlagPosition(object_path);

  }, display_framerate);

  intervals.push(interval_UpdateData, interval_UpdateDataDisplay);
  mountedApp.tracking = true;

}


function updateDataDisplay(current_state){

  // current_state object structure:
  // {
  //   'name':  name,
  //   'id': id,
  //   'latitude': latitude,
  //   'longitude': longitude,
  //   'velocity': velocity,
  //   'visibility': visibility,
  //   'footprint': footprint,
  //   'time': time,
  //   'daynum': daynum,
  //   'solar-latitude': solar_lat,
  //   'solar-longitude': solar_lon,
  //   'units': units
  // }

  Object.keys(current_state).forEach(key => {
    
    data_field_element = document.getElementById(key);
    value = current_state[key];

    if ((value != undefined) && (data_field_element != undefined)){
      data_field_element.textContent = value;
    }
    
    if ((value === undefined) && (data_field_element != undefined)){
      data_field_element.textContent = '-';
  }    
});

}

function fetchCurrentState(norad_number, object_path){

  if (norad_number == 33053){

    // {
    //   "info": {
    //       "satname": "GLAST",
    //       "satid": 33053,
    //       "transactionscount": 10
    //   },
    //   "positions": [
    //       {
    //           "satlatitude": 1.59605474,
    //           "satlongitude": -49.6133944,
    //           "sataltitude": 521.72,
    //           "azimuth": 272.08,
    //           "elevation": -19.96,
    //           "ra": 357.51721362,
    //           "dec": 1.78652055,
    //           "timestamp": 1711479150,
    //           "eclipsed": false
    //       }
    //   ]
    // }

    API_URL = "https://sky-vue-api.onrender.com/";

    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {

      // Signal that fetching process is happening:
      activityLogging("updating parameters");
      
      // Updates Earth's ilumination state (so far only for the 3D view):
      updateEarthIlumination(Number(data.positions[0].timestamp));

      //Unit conversion:
      let time =  timestampToDateConversion(Number(data.positions[0].timestamp));

      let current_state = {

        'name':  data.info.satname,
        'id': data.info.satid,
        'latitude': data.positions[0].satlatitude,
        'longitude': data.positions[0].satlongitude,
        'altitude': data.positions[0].sataltitude,
        'velocity': data.velocity,
        'visibility': data.positions[0].eclipsed,
        'footprint': data.footprint,
        'time': time,
        'daynum': data.daynum,
        'solar-latitude': data.solar_lat,
        'solar-longitude': data.solar_lon,
        'units': data.units
      
      }

      updateDataDisplay(current_state);
      object_path.push(current_state);
      updateDataManager(object_path);
      
    }); 
  }

  if (norad_number == 25544) {

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

    API_URL = source_URL + "v1/satellites/" + norad_number + "?units=" + mountedApp.units; 
      // https://api.wheretheiss.at/v1/satellites/25544?units=miles
  fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {

    // Signal that fetching process is happening:
    activityLogging("updating parameters");
    
    // Updates Earth's ilumination state (so far only for the 3D view):
    updateEarthIlumination(Number(data.timestamp));

    //Unit conversion:
    let time =  timestampToDateConversion(Number(data.timestamp));
        
    let current_state = {

      'name':  data.name,
      'id': data.id,
      'latitude': data.latitude,
      'longitude': data.longitude,
      'altitude': data.altitude,
      'velocity': data.velocity,
      'visibility': data.visibility,
      'footprint': data.footprint,
      'time': time,
      'daynum': data.daynum,
      'solar-latitude': data.solar_lat,
      'solar-longitude': data.solar_lon,
      'units': data.units
    
    }

    updateDataDisplay(current_state);
    object_path.push(current_state);
    updateDataManager(object_path);
    
  });
  }
  

  
}

