// Configuration parameters.
let wiki_update_rate = 1000;
let data_update_rate = 3000;
let display_framerate = data_update_rate;
let previous_path_step = 100;
let number_of_previous_positions = 10;
let previous_states_update_rate = 1000;
let units = ["kilometers"];

// Storage for the object's collected successive states.
const pageStates = {interface_state:'2D', data_display:'output'};
const object_previous_path = [];
const object_path = [];
const user_location = [];


function initializeInterfaceState(){
    
    changeInterfaceState("map2D-tab");
    document.getElementById('map2D-tab').style.opacity = 0.9;
    document.getElementById('map2D-tab').style.borderBottomStyle = "dashed";
    document.getElementById('map2D-tab').style.borderWidth = "3px 3px 0.1px 3px";
    document.getElementById('map2D-tab').style.fontWeight = 500;

    changeDataDisplayState("output-tab");
    document.getElementById('output-tab').style.opacity = 0.9;
    document.getElementById('output-tab').style.borderBottomStyle = "dashed";
    document.getElementById('output-tab').style.borderWidth = "3px 3px 0.1px 3px";
    document.getElementById('output-tab').style.fontWeight = 500;
    
    // Making data-display and main-window elements have the same height.
    window.onload = function() {
        makeSameHeightByID("data-display", "main-window");
    };
    window.onresize = function() {
        makeSameHeightByID("data-display", "main-window");
    };

}

initializeInterfaceState();

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

    let intervals = [interval_UpdateData, interval_UpdateDataDisplay];
    
}, (number_of_previous_positions) * previous_states_update_rate);




 