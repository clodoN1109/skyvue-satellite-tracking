// updateMap([path_1, line_level_detail_1], ...)
function updateMap(paths) {

  function drawArray(path, detail_level){
   
    if(path.length === 0){
      return
    }

    let step = Math.floor(100/detail_level);

    for (let index = 0; index < path.length - 1; index += step) {
    
      latitude = path[index]['latitude'];
      longitude = path[index]['longitude'];
      
      //Unit conversions:
      latitude = (Number(latitude) - 90)*(-2.2222);
      longitude = (Number(longitude) + 180)*(2.2222);
      
      scale_fix = 2.66;
      
      lat = latitude/scale_fix;
      lon = longitude/scale_fix;
      
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(lon, lat, 2, 2);
    }

  }

  const ctx = canvas.getContext("2d");
  if (ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    paths.forEach(path => {
      drawArray(path[0], path[1]);
    });
    
  }
}

function updateObjectPosition(object_path){
  
  latitude = object_path[object_path.length-1]['latitude'];
  longitude = object_path[object_path.length-1]['longitude'];

  //Unit conversions, scaling and positional adjustments:
  satellite_picture_width = Number(document.getElementById("satellite").offsetWidth); 
  satY = (Number(latitude) - 90)*(-2.2222) - satellite_picture_width/2;
  satX = (Number(longitude) + 180)*(2.2222) - satellite_picture_width/2;

  visibility_radius_width = Number(document.getElementById("visibility-radius").offsetWidth); 
  radiusY = (Number(latitude) - 90)*(-2.2222) - visibility_radius_width/2;
  radiusX = (Number(longitude) + 180)*(2.2222) - visibility_radius_width/2;

  document.getElementById("satellite").style.transform = "translate(" + satX + "px, " + satY +  "px)";
  document.getElementById("visibility-radius").style.transform = "translate(" + radiusX + "px, " + radiusY +  "px)";

}

function updateNationalFlagPosition(object_path){
  
  latitude = object_path[object_path.length-1]['latitude'];
  longitude = object_path[object_path.length-1]['longitude']; 
  fetch(mountedApp.source_URL + "v1/coordinates/" + latitude + "," + longitude)
  .then((response) => response.json())
  .then((iss) => {
    
    let country_code = iss.country_code;
    // country_code = 'BR';   
    if (country_code != "??"){
      
      document.getElementById("satellite-location-name").textContent = country_code;
      let flagURL = "https://flagsapi.com/" + country_code + "/shiny/64.png";
      document.getElementById("satellite-location-flag").src = flagURL;
      
      satellite_picture_width = Number(document.getElementById("satellite").offsetWidth); 
      positionY = (Number(latitude) - 90)*(-2.2222);
      positionX = (Number(longitude) + 180)*(2.2222);

      document.getElementById("satellite-location-flag").style.transform = "translate(" + (positionX - satellite_picture_width/2 -5) + "px, " + (positionY - satellite_picture_width/2 - 5) +  "px)";
      document.getElementById("satellite-location-name").style.transform = "translate(" + (positionX + 10) + "px, " + (positionY + 10) +  "px)";

    }
    
    else{
      
      document.getElementById("satellite-location-flag").src = "";
      document.getElementById("satellite-location-name").textContent = "";
      
    }
    
  });

  

}