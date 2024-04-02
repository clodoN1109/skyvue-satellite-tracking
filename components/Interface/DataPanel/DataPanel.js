app.component('data-panel', {
    template:
    /*html*/
    `
    <div id="data-display" >
					<div id="log-box" >
						<div class="loader" id="log-loader"></div>
						<div id="log" ></div>
					</div>
					
					<div id="data-tabs">
						<div @click="selectTab($event.target)" class="data-tab" id="source-tab">SOURCE</div>
						<div @click="selectTab($event.target)" class="data-tab" id="data-tab">DATA</div>
						<div @click="selectTab($event.target)" class="data-tab" id="config-tab">CONFIG.</div>
					</div>
					
					<div class="data-container" id="source-container" v-show="data_display_state === 'source'">
						
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
					
					<div class="data-container" id="output-container" v-show="data_display_state === 'data'">
						
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
					
					<div class="data-container" id="input-container" v-show="data_display_state === 'config'">
						
						<div class="parameters-display">
							
							<div>
								<div>
									<div class="spec-info-mini" title="Interval between queries.">?</div>
									Data update time
								</div>
								
								<div class="data-field input-box">
									<input type="text" id="data-update-time" readonly class="input-field" style="cursor: default;" value="5.0">
									<div class="units time-unit">s</div>
									<div class="updown-button-pair">
										<button onclick="increment('data-update-time')" class="updown-button">▲</button>
										<button onclick="decrement('data-update-time')" class="updown-button">▼</button>	
									</div>
								</div>	
							</div>
							
							<div>
								<div>
									<div class="spec-info-mini" title="Path plot point density.">?</div>
									Plot detail level
								</div>
								
								<div class="data-field input-box">
									<input type="text" id="line-level-detail" readonly class="input-field" style="cursor: default;" value="5">
									<div class="units time-unit">%</div>
									<div class="updown-button-pair">
										<button onclick="increment('line-level-detail')" class="updown-button">▲</button>
										<button onclick="decrement('line-level-detail')" class="updown-button">▼</button>	
									</div>
								</div>	
							</div>
							
							
							<div>
								<div>
									<div class="spec-info-mini" title="Interval for re-rendering the map canvas.">?</div>
									Display refresh time
								</div>
								
								<div class="data-field input-box">
									<input type="text" id="display-update-time" readonly class="input-field" style="cursor: default;" value="1.0">
									<div class="units time-unit">s</div>
									<div class="updown-button-pair">
										<button onclick="increment('display-update-time')" class="updown-button">▲</button>
										<button onclick="decrement('display-update-time')" class="updown-button">▼</button>	
									</div>
								</div>	
							</div>
							
							
							
							<div>
								<div>
									<div class="spec-info-mini" title="">?</div>
									Units
								</div>
								<div class="data-field">
									<select onchange="{updateUnits(event)}" title="units selection" style="color: rgba(255, 254, 254, 0.931); background-color: rgba(72, 96, 161, 0.475); width: 160px;"  id="units-system-field">
										<option value="Kilometers">metric</option>
										<option value="Miles">imperial</option>
									</select>						
								</div>
							</div>
							
							<br>
							
						</div>
						
					</div>
					
				</div>
    `
    ,
    data() {
        return {
            
            data_display_state: 'source',
            satellites: [
                
            {norad_number: '25544', name: 'ISS (International Space Station)'},
            {norad_number: '33053', name: 'GLAST (Fermi Gamma-ray Space Telescope)'},

            ],
            selected_satellite: '',
        }
    },

    props: {
        tracking: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        selectTab(element){
            
            tab_ID = element.id;
    
            newState = tab_ID.substring(0, tab_ID.indexOf('-'));
    
            this.data_display_state = newState;

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
        
        },
		
        openDataManager(){
            document.getElementById('data-manager-container').style.display = 'flex';
        }

    }
	,
	mounted(){

		this.selectTab(document.getElementById('source-tab'));

	}
})