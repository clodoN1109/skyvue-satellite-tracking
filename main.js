// State history of object.
const object_path = [];
const user_location = [];

setTimeout(() => {

    showUserLocation(user_location);
    drawPreviousStates(object_path, 10);
   
}, 1000);

const interval_Wiki = setInterval(updateWikiInfo, 10000);

const interval_ISS = setInterval(() => {

    fetchCurrentState(object_path);  
    drawPoints(object_path); 
    updateObjectPosition(object_path);
    setNationalFlag(object_path);
    document.getElementsByClassName("satellite")[0].style.opacity = 1;

}, 60000);


 