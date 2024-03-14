// Configuration parameters.
let wiki_update_rate = 1000;
let data_update_rate = 3000;
let display_framerate = data_update_rate;
let number_of_previous_positions = 30;
let previous_states_update_rate = 1000;
let units = ["kilometers"];

// Storage for the object's collected successive states.
const pageStates = {interface_state:'2D'};
const object_previous_path = [];
const object_path = [];
const user_location = [];

// Making data-display and main-window elements have the same height.
makeSameHeightByID("data-display", "main-window");

changeInterfaceState("map2D-option");
document.getElementById('map2D-option').style.opacity = 1;
document.getElementById('map2D-option').style.fontWeight = 700;

showUserLocation(user_location);

fetchPreviousStates(object_previous_path, number_of_previous_positions, previous_states_update_rate);

// Starts wiki info collection asynchronous loop.
const interval_Wiki = setInterval(updateWikiInfo, 10000);

// Starts data display update asynchronous loop.
setTimeout(() => {

    // Starts data collection asynchronous loop.
    const interval_UpdateData = setInterval(() => {

    fetchCurrentState(object_path);  

}, data_update_rate);

    const interval_UpdateDataDisplay = setInterval(() => {

        updateMap([[object_previous_path, 1], [object_path.slice(0, -10), 25]]); 
        updateObjectPosition(object_path);
        updateNationalFlagPosition(object_path);

    }, display_framerate);
    
}, (number_of_previous_positions) * previous_states_update_rate);




 