function signalFetchingEvent(){

    document.getElementById("sign").style.backgroundImage = 
    'linear-gradient(0deg, rgb(94, 94, 255), rgb(94, 94, 255))';
    document.getElementById("fetchWarning").style.color = 'white';

    setTimeout(() => {

      document.getElementById("sign").style.backgroundImage = '';
      document.getElementById("fetchWarning").style.color = 'white';

    },1000);

}

function updateDataDisplay(current_state){
    document.getElementById("latitude").value = current_state[0];
    document.getElementById("longitude").value = current_state[1];
    document.getElementById("altitude").value = current_state[2];
    document.getElementById("velocity").value = current_state[3];
    document.getElementById("time").value = current_state[4];
}

function fetchIssData(){

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