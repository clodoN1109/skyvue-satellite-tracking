// Configuration parameters.
let wiki_update_rate = 1000;
let data_update_rate = 3000;
let display_framerate = 3000;
let number_of_previous_positions = 30;

// Storage for the object's collected successive states.
const pageStates = {interfaceState:'2D'};
const object_previous_path = [];
const object_path = [];
const user_location = [];

// Making data-display and map-container elements have the same height.
makeSameHeightByID("data-display", "map-container");

showUserLocation(user_location);

fetchPreviousStates(object_previous_path, number_of_previous_positions, 1000);

// Starts wiki info collection asynchronous loop.
const interval_Wiki = setInterval(updateWikiInfo, 10000);

// Starts data display update asynchronous loop.
setTimeout(() => {

    // Starts data collection asynchronous loop.
    const interval_UpdateData = setInterval(() => {

    fetchCurrentState(object_path);  

}, data_update_rate);

    const interval_UpdateDataDisplay = setInterval(() => {

        updateMap([[object_previous_path, 1], [object_path.slice(0, -3), 25]]); 
        updateObjectPosition(object_path);
        updateNationalFlagPosition(object_path);

    }, display_framerate);
    
}, (number_of_previous_positions) * 1000);




 