function updateWikiInfo(){

    let info1 = "The International Space Station (ISS) is the largest modular space station currently in low Earth orbit.";
    let info2 = "The first ISS component was launched in 1998, and the first long-term residents arrived on 2 November 2000 after being launched from the Baikonur Cosmodrome on 31 October 2000."
    let info3 ="The ISS orbital period is approximately 90 minutes.";
    let info4 ="The station is divided into two sections: the Russian Orbital Segment (ROS) is operated by Russia, while the United States Orbital Segment (USOS) is run by the United States as well as by the other states.";
    let info5 = " As of April 2022, 251 astronauts, cosmonauts, and space tourists from 20 different nations have visited the space station, many of them multiple times.";
    let infoList = [info1, info2, info3, info4, info5];
  
    document.getElementsByClassName("wikiInfo")[0].textContent = infoList[Math.floor(Math.random() * infoList.length)];
  
  }
  
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
  
  function saveas(){}

  const selectElement = document.getElementById("mySelect");
  const selectedValue = selectElement.value;
  const selectedText = selectElement.options[selectElement.selectedIndex].text;

  console.log(`Selected value: ${selectedValue}`);
  console.log(`Selected text: ${selectedText}`);