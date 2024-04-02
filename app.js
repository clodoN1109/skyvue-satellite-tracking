const app = Vue.createApp( {

    data() {
        return{
            tracking: false,
            //API configuration
            source_URL: 'https://api.wheretheiss.at/',
            // Collected data
            // object_path[i] = {index : index, name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units};
            object_path: new Array(),
            user_location: new Array(),
            // Container for scheduled intervals.
            intervals: new Array(),
            // Container for scheduled timeouts.
            timeouts: new Array(),
            // Display configuration (time in miliseconds).
            wiki_update_rate: 10000,
            data_update_rate: 5000,
            display_framerate: 1000,
            line_level_detail: 5,
            loader_time: 1000,
            units: 'kilometers'
        }
    },

    methods: {

    },

    mounted() {
        
        setTimeout(() => {

            const interval_Wiki = setInterval(updateWikiInfo, this.wiki_update_rate);
            
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
