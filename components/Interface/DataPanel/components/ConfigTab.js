app.component('config-tab', {
    template: 
    /*html*/
    `
    <div class="data-container" id="input-container">
						
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
    `
})