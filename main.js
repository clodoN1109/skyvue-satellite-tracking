// Storage for the object's successive states.
const object_path = [];
const user_location = [];

showUserLocation(user_location);
drawPreviousStates(object_path, 30, 100);
   
const interval_Wiki = setInterval(updateWikiInfo, 10000);

const interval_ISS = setInterval(() => {

    fetchCurrentState(object_path);  
    updateMap(object_path); 

}, 100000);


 