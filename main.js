const iss_data = [0, 0, 0];

function timestampToDateConversion(timestamp){

  let epoch = Math.floor(new Date().getTime(timestamp)/1000.0); 
  var myDate = new Date( epoch *1000);
  myDate.toGMTString()+"<br>"+myDate.toLocaleString();  

  return myDate;

}

function fetchIssData(){

  fetch("https://api.wheretheiss.at/v1/satellites/25544")
  .then((response) => response.json())
  .then((iss) => {

    console.log(iss);

    iss_data[0] = iss.latitude;
    iss_data[1] = iss.longitude;
    iss_data[2] = timestampToDateConversion(Number(iss.timestamp));


    console.log("iss_data: ", iss_data);

    document.getElementById("latitude").value = iss_data[0];
    document.getElementById("longitude").value = iss_data[1];
    document.getElementById("time").value = iss_data[2];

    let latitude = (Number(iss_data[0]) - 90)*(-2.2222);
    let longitude = (Number(iss_data[1]) + 180)*(2.2222);
    let time = iss_data[2];

    let actual_position = document.getElementsByClassName("satellite")[0].style.transform;


    document.getElementsByClassName("satellite")[0]
    .style.transform = "translate(" + longitude + "px, " + latitude +  "px)";

  setTimeout(fetchIssData,4000);



  });

}


fetchIssData();


