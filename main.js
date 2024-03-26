// Container for scheduled intervals and timeouts.
let intervals = [];
let timeouts = [];
// Input/Configuration parameters - time in miliseconds.
let source_URL = 'https://api.wheretheiss.at/';
let wiki_update_rate = 1000;
let data_update_rate = 5000;
let display_framerate = 1000;
let line_level_detail = 5;
let previous_path_step = 100;
let number_of_previous_positions = 10;
let previous_states_update_rate = 1000;
let loader_time = 1000;

// Output/Storage for the object's collected successive states.
const object_previous_path = [];
// object_path[i] = [name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units];
const object_path = []; 
const user_location = [];


window.onload = function() {

    initializeInterface();

};


const app = Vue.createApp( {

    data() {
        return{
            viewer_state: 'map2D',
            data_display_state: 'source',
            units: 'kilometers',
            satellites: [
                
                {norad_number: '25544', name: 'ISS (International Space Station)'},
                {norad_number: '33053', name: 'GLAST (Fermi Gamma-ray Space Telescope)'},

            ],
            selected_satellite: '',
            tracking: false,
        }
    }

} )

const mountedApp = app.mount('#app');

 