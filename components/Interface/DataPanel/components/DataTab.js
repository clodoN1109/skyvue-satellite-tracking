app.component('data-tab', {
    template:
    /*html*/
    `
    <div class="data-container" id="output-container">
						
        <div class="parameters-display">
            
            <div>
                <div>Latitude</div>
                <div class="data-field">
                    <output style="cursor: default;" id="latitude" readonly value="0"></output> 
                    <div class="units coordinates-unit">deg</div>
                </div>
            </div>
            
            <div>
                <div>Longitude</div>
                <div class="data-field">
                    <output style="cursor: default;" id="longitude" readonly class="" value="0"></output> 
                    <div class="units coordinates-unit">deg</div>
                </div>
            </div>
            
            <div>
                <div>Altitude</div>
                <div class="data-field">
                    <output style="cursor: default;" id="altitude" readonly class="" value="0"></output> 
                    <div class="units distance-unit">Km</div>
                </div>
            </div>
            
            <div>
                <div>Velocity</div>
                <div class="data-field">
                    <output style="cursor: default;" id="velocity" readonly class="" value="0"></output> 
                    <div class="units velocity-unit">Km/h</div>
                </div>
            </div>
            
            <div>
                <div>Solar Latitude</div>
                <div class="data-field">
                    <output style="cursor: default;" id="solarlatitude" readonly class="" value="0"></output> 	
                    <div class="units coordinates-unit">deg</div>
                </div>
            </div>
            
            <div>
                <div>Solar Longitude</div>
                <div class="data-field">
                    <output style="cursor: default;" id="solarlongitude" readonly class="" value="0"></output> 	
                    <div class="units coordinates-unit">deg</div>
                </div>
            </div>
            
            <div>
                <div>
                    <div class="spec-info-mini" title="The visibility of a satellite depends on its altitude. It determines the area from which the satellite is visible from an Earth station.">?</div>
                    Visibility
                </div>
                <div class="data-field">
                    <output style="cursor: default;" id="visibility" readonly class="" value="0"></output> 	
                    <div class="units">&nbsp;</div>
                </div>
            </div>
            
            <div>
                <div>
                    <div class="spec-info-mini" title="The footprint of a communications satellite is the ground area that its transponders offer coverage, and determines the satellite dish diameter required to receive each transponder's signal.">?</div>
                    Footprint
                </div>
                <div class="data-field">
                    <output style="cursor: default;" id="footprint" readonly class="" value="0"></output> 	
                    <div class="units distance-unit">Km</div>
                </div>
            </div>
            
            <br>
            
        </div>
        
        <div class="button-box">
            <button @click="openDataManager()" class="button"><img src="./assets/data.png" width="30px">DATA MANAGER</button>
        </div>
        
    </div>
    `
    ,
    methods: {
        openDataManager(){
            document.getElementById('data-manager-container').style.display = 'flex';
        }
    }
})