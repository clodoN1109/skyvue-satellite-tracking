const app = Vue.createApp( {

    data() {
        return{
            // Interface state
            viewer_state: 'map2D',
            data_display_state: 'source',
            // Tracking system state 
            tracking: false, 
            //API configuration
            source_URL: 'https://api.wheretheiss.at/',
            // Collected data
            satellites: [
                
                {norad_number: '25544', name: 'ISS (International Space Station)'},
                {norad_number: '33053', name: 'GLAST (Fermi Gamma-ray Space Telescope)'},

            ],
            selected_satellite: '',
            // object_path[i] = [name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units];
            object_path: [],
            user_location: [],
            // Container for scheduled intervals.
            intervals: new Array(),
            // Container for scheduled timeouts.
            timeouts: [],
            // Display configuration (time in miliseconds).
            wiki_update_rate: 10000,
            data_update_rate: 5000,
            display_framerate: 1000,
            line_level_detail: 5,
            loader_time: 1000,
            units: 'kilometers'
        }
    },

    mounted() {

        setTimeout(() => {
            
            const interval_Wiki = setInterval(updateWikiInfo, this.wiki_update_rate);

            // Selecting default tabs for each window.
            selectViewerTab(document.getElementById("map2D-tab"));
            selectDataTab(document.getElementById("source-tab"));
            
            // Making data-display and main-window elements have the same height.
            makeSameHeightByID("data-display", "main-window");
            window.onresize = function() {
                makeSameHeightByID("data-display", "main-window");
            };
        
            // Initialize 3D map Sun ilumination.
            let timestamp = (new Date()).getTime().toString().substring(0, 10);
            updateEarthIlumination(timestamp);
        
            gradualOpacity('interface', 1500);    
            map2DGradualAppearance(3000);

        }, 100);


    }


} )
