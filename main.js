// State history of object.
const iss_path = [];
const user_location = [];

setTimeout(() => {

    fetchData(iss_path);
    showUserLocation(user_location);

    setTimeout(() => {

        drawPoints(iss_path); 
        updateObjectPosition(iss_path);
        setNationalFlag(iss_path);

        document.getElementsByClassName("satellite")[0].style.opacity = 1;
        document.getElementsByClassName("user-location")[0].style.opacity = 1;

    }, 1000);

}, 1000);

const interval_Wiki = setInterval(updateWikiInfo, 10000);
const interval_ISS = setInterval(() => {

    fetchData(iss_path);  

    setTimeout(() => {

        drawPoints(iss_path); 
        updateObjectPosition(iss_path);
        setNationalFlag(iss_path);

    }, 1000);

}, 60000);


