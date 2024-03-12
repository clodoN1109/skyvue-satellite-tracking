function drawPoints(object_path) {

  if(object_path.length === 0){
    return
  }

  const ctx = canvas.getContext("2d");
  if (ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    key = 0;
    object_path.forEach(element => {

      let latitude = element[0];
      let longitude = element[1];
      
      //Unit conversions:
      latitude = (Number(latitude) - 90)*(-2.2222);
      longitude = (Number(longitude) + 180)*(2.2222);
      
      const canvas = document.getElementById("canvas");
      
      
      let scale_fix = 2.66;
      
      lat = latitude/scale_fix;
      lon = longitude/scale_fix;
      
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(lon, lat, 2, 2);
      
    });
  }
}

function updateObjectPosition(object_path){
  
  let latitude = object_path[object_path.length-1][0];
  let longitude = object_path[object_path.length-1][1];
  
  //Unit conversions, scaling and positional adjustments:
  satellite_picture_width = Number(document.getElementsByClassName("satellite")[0].width); 
  latitude = (Number(latitude) - 90)*(-2.2222) - satellite_picture_width/2;
  longitude = (Number(longitude) + 180)*(2.2222) - satellite_picture_width/2;
  
  document.getElementsByClassName("satellite")[0].style.transform = "translate(" + longitude + "px, " + latitude +  "px)";
  document.getElementById("location-name").style.transform = "translate(" + longitude + "px, " + latitude +  "px)";
  
}

function setNationalFlag(object_path){
  
  latitude = object_path[object_path.length-1][0];
  longitude = object_path[object_path.length-1][1];
  
  fetch("https://api.wheretheiss.at/v1/coordinates/" + latitude + "," + longitude)
  .then((response) => response.json())
  .then((iss) => {
    
    let country_code = iss.country_code;
    // country_code = 'US';
    if (country_code != "??"){
      
      document.getElementById("location-name").textContent = country_code;
      let flagURL = "https://flagsapi.com/" + country_code + "/shiny/64.png";
      document.getElementById("location-flag").src = flagURL;
      
      satellite_picture_width = Number(document.getElementsByClassName("satellite")[0].width); 
      latitude = (Number(latitude) - 90)*(-2.2222) + satellite_picture_width/8;;
      longitude = (Number(longitude) + 180)*(2.2222) + satellite_picture_width/8;;
      document.getElementById("location-flag").style.transform = "translate(" + longitude + "px, " + latitude +  "px)";
      
    }
    
    else{
      
      document.getElementById("location-flag").src = "";
      document.getElementById("location-name").textContent = "";
      
    }
    
  })
}