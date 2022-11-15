
const iss_data = [0, 0, 0];

const address = fetch("http://api.open-notify.org/iss-now.json")
.then((response) => response.json())
.then((iss) => {

  console.log(iss);

  iss_data[0] = iss.iss_position.latitude;
  iss_data[1] = iss.iss_position.longitude;
  iss_data[2] = iss.timestamp;

  console.log("iss_data: ", iss_data);

  document.getElementById("latitude").value = iss_data[0];
  document.getElementById("longitude").value = iss_data[1];
  document.getElementById("time").value = iss_data[2];

  let latitude = Number(iss_data[0]) - 90;
  let longitude = Number(iss_data[1]) + 180;
  let time = iss_data[2];

  let actual_position = document.getElementsByClassName("satellite")[0].style.transform;
  console.log("actual position: ",actual_position);

  document.getElementsByClassName("satellite")[0]
  .style.transform = "translate(" + longitude + "px, " + latitude +  "px)";



});

