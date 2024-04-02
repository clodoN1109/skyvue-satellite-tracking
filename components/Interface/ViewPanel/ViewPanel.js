app.component('view-panel', {
    template:
    /*html*/
    `
    <div id ="main-window">
					
        <div id="view-tabs">
            <div @click="selectTab($event.target)" class="tab" id="specs-tab">SPECS</div>
            <div @click="selectTab($event.target)" class="tab" id="map2D-tab">2D VIEW</div>
            <div @click="selectTab($event.target)" class="tab" id="map3D-tab">3D VIEW</div>
            <div @click="selectTab($event.target)" class="tab" id="altitude-tab">ALTITUDE</div>
            <div @click="selectTab($event.target)" class="tab" id="statistics-tab">STATISTICS</div>
            <div @click="selectTab($event.target)" class="tab" id="forecast-tab">FORECAST</div>
        </div>
        
        <output id="time" readonly value=""></output>
        
        <div id="screen" >
            
            <div class="display-system" id="specs-container" v-show="viewer_state === 'specs'">
                <div class="spec">
                    <div style="display: inline-flex; gap: 5px;">
                        <div class="spec-info" title="Name of the object currently being tracked.">?</div>
                        <div class="spec-name">name: </div>	
                    </div>
                    <output class="spec-value" id="name" readonly value="0"></output>
                </div>
                <div class="spec">
                    <div style="display: inline-flex; gap: 5px;">
                        <div class="spec-info" title="The NORAD Catalog Number, also known as the SATCAT, is a nine-digit sequential identifier assigned by the United States Space Command (USSPACECOM) to all artificial objects in Earth’s orbit and those that have left Earth’s orbit. It represents the order of launch or discovery and is used to track satellites and other space objects.">?</div>
                        <div class="spec-id">NORAD catalog number:</div>	
                    </div>
                    <output class="spec-value" id="id" readonly value="0"></output>
                </div>
            </div>
            
            <div class="display-system" id="map2D-container" v-show="viewer_state === 'map2D'">
                <img id="map2D-img" src="./assets/map2D.png">
                <img v-if="tracking" id="satellite" src="assets/satellite.png" alt="a mundi map" lang="en">
                <div v-if="tracking" id="visibility-radius"></div>
                <img id="user-location" src="assets/here.png" alt="here" lang="en">
                <img width="20px" id="user-location-flag">
                <img v-if="tracking" width="20px" id="satellite-location-flag">
                <div v-if="tracking" id="satellite-location-name"></div>
                <div id="user-location-name"></div>
                <canvas id="canvas"></canvas>
            </div>

            <div class="display-system" id="map3D-container" v-show="viewer_state === 'map3D'">
                
                <div class="padding_wrapper"><div class="es_space_drawer_container" id="es_earth_sunlight"></div></div>
                <div class="es_date" id="es_earth_sunlight_date_slider_container"></div>
                <div class="es_time" id="es_earth_sunlight_time_slider_container"></div>
                
            </div>

            <div class="display-system SOON" id="altitude-container" v-show="viewer_state === 'altitude'">
                
                <div>IN DEVELOPMENT</div>
                
                <div id="contribute">
                    <a class="buymeacoffee-button" target="_blank" href="https://www.buymeacoffee.com/"><img src="./assets/buymeacoffee-button.png" alt="Buy Me A Coffee" style="width: 165px;" ></a>
                    <a class="jointheteam-button" target="_blank" href="https://trello.com/b/D841pzzW/skylantern-web-app"><img src="./assets/join.png" alt="Join the team" style="width: 165px;" ></a>
                </div>
                
            </div>

            <div class="display-system SOON" id="statistics-container" v-show="viewer_state === 'statistics'">
                
                <div>IN DEVELOPMENT</div>
                
                <div id="contribute">
                    <a class="buymeacoffee-button" target="_blank" href="https://www.buymeacoffee.com/"><img src="./assets/buymeacoffee-button.png" alt="Buy Me A Coffee" style="width: 165px;" ></a>
                    <a class="jointheteam-button" target="_blank" href="https://trello.com/b/D841pzzW/skylantern-web-app"><img src="./assets/join.png" alt="Join the team" style="width: 165px;" ></a>
                </div>
                
            </div>

            <div class="display-system SOON" id="forecast-container" v-show="viewer_state === 'forecast'">
                
                <div>IN DEVELOPMENT</div>
                
                <div id="contribute">
                    <a class="buymeacoffee-button" target="_blank" href="https://www.buymeacoffee.com/"><img src="./assets/buymeacoffee-button.png" alt="Buy Me A Coffee" style="width: 165px;" ></a>
                    <a class="jointheteam-button" target="_blank" href="https://trello.com/b/D841pzzW/skylantern-web-app"><img src="./assets/join.png" alt="Join the team" style="width: 165px;" ></a>
                </div>
                
            </div>
            
        </div>
                
        <div id="view-labels">
            <div class="label" id="user-label" style="opacity: 0.9;">
                <img class="label-img" src="./assets/here.png">
                <div class="label-text">you're here</div>
            </div>
            <div class="label" id="satellite-label" style="opacity: 0.9;">
                <img class="label-img" src="./assets/satellite.png">
                <div class="label-text">sattelite</div>
            </div>
            <div class="label" id="dashed-circle-label" style="opacity: 0.9;">
                <img class="label-img" src="./assets/dashed_circle.png">
                <div class="label-text">footprint</div>
            </div>
            <div class="label" id="user-label" style="opacity: 0.9;">
                <img class="label-img" src="./assets/dotted_line.png">
                <div class="label-text">traveled path</div>
            </div>
            <div class="label" id="user-label" style="opacity: 0.9;">
                <img class="label-img" src="./assets/continuous_line.png">
                <div class="label-text">predicted path</div>
            </div>
        </div>
                
    </div>	
    `
    ,
    data() {
        return {
            viewer_state: 'map2D'
        }
    },

    props: {
        tracking: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        selectTab(element) {

        tab_ID = element.id;
            
        newState = tab_ID.substring(0, tab_ID.indexOf('-'));
        
        this.viewer_state = newState;
            
        elementClass = element.className;
    
        tabs = document.getElementsByClassName(elementClass);
    
        for (let index = 0; index < tabs.length; index++) {
            tabs[index].style.opacity = 0.5;
            tabs[index].style.borderBottomStyle = "solid";
            tabs[index].style.borderWidth = "0.1px 0.1px 3px 0.1px";
            tabs[index].style.fontWeight = 300;
        }
    
        element.style.opacity = 0.9;
        element.style.borderBottomStyle = "dashed";
        element.style.borderWidth = "3px 3px 0.1px 3px";
        element.style.fontWeight = 500;
        
        }
    },

    mounted(){
        this.selectTab(document.getElementById('map2D-tab'));
    }

})