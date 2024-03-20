// Possible page states.
let pageStates = {interface_state:'2D', data_display:'output'};
// Programmed intervals created with the setInterval method.
let intervals = [];
// Input/Configuration parameters.
let source_URL = 'https://api.wheretheiss.at/';
let wiki_update_rate = 1000;
let data_update_rate = 5000;
let display_framerate = 1000;
let line_level_detail = 5;
let previous_path_step = 100;
let number_of_previous_positions = 10;
let previous_states_update_rate = 1000;
let units = ["kilometers"];
let loader_time = 1000;

// Output/Storage for the object's collected successive states.
const object_previous_path = [];
// object_path[i] = [name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units];
const object_path = []; 
const user_location = [];


window.onload = function() {

    const interval_Wiki = setInterval(updateWikiInfo, 10000);

    initializeInterfaceWindows();

    let timestamp = (new Date()).getTime().toString().substring(0, 10);
    updateEarthIlumination(timestamp);

    showUserLocation(user_location);

};






 