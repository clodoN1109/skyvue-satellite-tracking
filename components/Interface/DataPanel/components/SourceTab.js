app.component('source-tab', {
    template:
    /*html*/
    `
    <div class="data-container" id="source-container">

        <div class="parameters-display">
            <div id="source-display">
                
                <div>Satellite selection:</div>
                <div class="data-field">
                    <select onchange="{selectSatellite(event)}" style="color: rgba(255, 254, 254, 0.931); background-color: rgba(72, 96, 161, 0.475);"  id="satellite-field">
                        <option value="reset"></option>
                        <option v-for="sat in satellites" :value="sat.norad_number">{{sat['name']}}</option>
                    </select>
                </div>
                
            </div>
        </div>
        
        <div v-if="!tracking" class="button-box">
            <button onclick="startTracking(mountedApp.selected_satellite)" class="button">
                <img src="./assets/start_tracking.png" width="30px">
                START TRACKING
            </button>
        </div>
        
        <div v-if="tracking" class="button-box">
            <button onclick="stopTracking()" class="button">
                <img src="./assets/start_tracking.png" width="30px">
                STOP TRACKING
            </button>
        </div>
        
    </div>
    `
    ,
    data() {
        return {
            satellites: [
                
            {norad_number: '25544', name: 'ISS (International Space Station)'},
            {norad_number: '33053', name: 'GLAST (Fermi Gamma-ray Space Telescope)'},

            ],
            selected_satellite: ''
        }
    },
    props: {
        tracking: {
            type: Boolean,
            required: true
        }
    }
})