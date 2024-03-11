function draw(iss_path) {

    let latitude = iss_path[iss_path.length-1][0];
    let longitude = iss_path[iss_path.length-1][1];

    //Unit conversions:
    latitude = (Number(latitude) - 90)*(-2.2222);
    longitude = (Number(longitude) + 180)*(2.2222);

    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
  
  
      let scale_fix = 2.66;
  
      /*console.log(iss_path);*/
  
  /*    for (item in iss_path) {
  
        lat = iss_path[item][0]/scale_fix;
        lon = iss_path[item][1]/scale_fix;
        
  
        ctx.fillStyle = "rgba(250, 100, 0, 1)";
        ctx.fillRect(lon, lat, 0.4, 0.4);
  
      }*/
  
  
      lat = latitude/scale_fix;
      lon = longitude/scale_fix;
  
  
      ctx.fillStyle = "rgba(20, 40, 200, 1)";
      ctx.fillRect(lon, lat, 0.33, 1);
  
  
    }
  }

  function updateObjectPosition(iss_path){

    let latitude = iss_path[iss_path.length-1][0];
    let longitude = iss_path[iss_path.length-1][1];

    //Unit conversions:
    latitude = (Number(latitude) - 90)*(-2.2222);
    longitude = (Number(longitude) + 180)*(2.2222);

    document.getElementsByClassName("satellite")[0].style.transform = "translate(" + longitude + "px, " + latitude +  "px)";
    latitude = (Number(latitude) - 470);
    longitude = (Number(longitude) + 13);
    document.getElementsByClassName("current-place")[0].style.transform = "translate(" + longitude + "px, " + latitude +  "px)";

  }

  function setNationalFlag(iss_path){

    latitude = iss_path[iss_path.length-1][0];
    longitude = iss_path[iss_path.length-1][1];

    fetch("https://api.wheretheiss.at/v1/coordinates/" + latitude + "," + longitude)
    .then((response) => response.json())
    .then((iss) => {

      let country_code = iss.country_code;
/*      country_code = 'US';*/
      if (country_code != "??"){

        document.getElementById("location").textContent = country_code;
        let flagURL = "url(https://flagsapi.com/" + country_code + "/flat/64.png" + ")";
        document.getElementById("location-flag").style.backgroundImage = flagURL;

      }

      else{

        document.getElementById("location-flag").style.backgroundImage = '';
        document.getElementById("location").textContent = "";
        
      }

    })
  }