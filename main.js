const iss_data = [0, 0, 0, 0];

function timestampToDateConversion(timestamp){

  let epoch = Math.floor(new Date().getTime(timestamp)/1000.0); 
  var myDate = new Date( epoch *1000);
  myDate.toGMTString()+"<br>"+myDate.toLocaleString();  

  return myDate;

}

function copyCoordinates(){

  let copyInfo = document.getElementById("latitude").value + ", " +
                    document.getElementById("longitude").value  + ", " +
                    document.getElementById("altitude").value + ", " +
                    document.getElementById("time").value;


  navigator.clipboard.writeText(copyInfo);

  alert("Copied the coordinates: " + copyInfo);

}

function fetchIssData(){

  fetch("https://api.wheretheiss.at/v1/satellites/25544")
  .then((response) => response.json())
  .then((iss) => {

    console.log(iss);

    iss_data[0] = iss.latitude;
    iss_data[1] = iss.longitude;
    iss_data[2] = timestampToDateConversion(Number(iss.timestamp));
    iss_data[3] = iss.altitude;


    console.log("iss_data: ", iss_data);

    document.getElementById("latitude").value = iss_data[0];
    document.getElementById("longitude").value = iss_data[1];
    document.getElementById("time").value = iss_data[2];
    document.getElementById("altitude").value = iss_data[3];

    let latitude = (Number(iss_data[0]) - 90)*(-2.2222);
    let longitude = (Number(iss_data[1]) + 180)*(2.2222);
    let time = iss_data[2];

    let actual_position = document.getElementsByClassName("satellite")[0].style.transform;


    document.getElementsByClassName("satellite")[0]
    .style.transform = "translate(" + longitude + "px, " + latitude +  "px)";

  setTimeout(fetchIssData,3000);



  });

}


fetchIssData();


