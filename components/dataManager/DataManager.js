app.component('data-manager', {
    template:
    /*html*/
    `
    <link href="./components/dataManager/style.css" rel="stylesheet" type="text/css" />

    <div id="data-manager-container">
        <div id="data-manager-screen">
            
            <div id="close-button-container">
                <div onclick="closeDataManager()" class="close-button" id="data-manager-close-button">x</div>
            </div>
            
            <div id="data-manager-title-container">
                <div id="data-manager-title"><img src="./assets/images/data.png" width="60px">Data Manager</div>
            </div>
            
            <div onmouseover="prepareDownloadButton()" id="download-button-container">
                <div class="download-button-box">
                    <a id="download-button" class="download-button"><img src="./assets/images/export.png" width="30px">DOWNLOAD DATA</a>
                </div>
            </div>
            
            <div class="data-table-container">
                <div id="data-table">
                    
                    <div class="header-row-container" id="data-header">
                        <div class="data-row" id="data-row-header">
                            <div class="index-data-manager data-manager-header-field">#</div>
                            <div class="time-data-manager data-manager-header-field">TIME</div>
                            <div class="latitude-data-manager data-manager-header-field">LATITUDE</div>
                            <div class="longitude-data-manager data-manager-header-field">LONGITUDE</div>
                            <div class="altitude-data-manager data-manager-header-field">ALTIDUDE</div>
                            <div class="velocity-data-manager data-manager-header-field">VELOCITY</div>
                            <div class="solar-latitude-data-manager data-manager-header-field">SOLAR LAT.</div>
                            <div class="solar-longitude-data-manager data-manager-header-field">SOLAT LON.</div>
                            <div class="visibility-data-manager data-manager-header-field">VISIBILITY</div>
                            <div class="footprint-data-manager data-manager-header-field">FOOTPRINT</div>
                        </div>
                        <div class="data-row-gadgets" style="opacity: 0;">
                            <img style="cursor: default;" src="./components/dataManager/assets/copy.png" class="copyButton data-manager-row-button">
                            <img style="cursor: default;" src="./components/dataManager/assets/bin.png" class="binButton data-manager-row-button">
                            
                        </div>
                    </div>
                    
                    <div class="units-row-container" id="data-header-units">
                        <div class="data-row" id="data-row-header-units">
                            <div class="index-data-manager data-manager-header-field-units">&nbsp;</div>
                            <div class="time-data-manager data-manager-header-field-units">(GMT)</div>
                            <div class="latitude-data-manager data-manager-header-field-units">(degrees)</div>
                            <div class="longitude-data-manager data-manager-header-field-units">(degrees)</div>
                            <div class="altitude-data-manager data-manager-header-field-units">(<div class="data-manager-table-units distance-unit">Km</div>)</div>
                            <div class="velocity-data-manager data-manager-header-field-units">(<div class="data-manager-table-units velocity-unit">Km/h</div>)</div>
                            <div class="solar-latitude-data-manager data-manager-header-field-units">(degrees)</div>
                            <div class="solar-longitude-data-manager data-manager-header-field-units">(degrees)</div>
                            <div class="visibility-data-manager data-manager-header-field-units">&nbsp;</div>
                            <div class="footprint-data-manager data-manager-header-field-units">(<div class="data-manager-table-units distance-unit">Km</div>)</div>
                        </div>
                        <div class="data-row-gadgets" style="opacity: 0;">
                            <img style="cursor: default;" src="./components/dataManager/assets/copy.png" class="copyButton data-manager-row-button">
                            <img style="cursor: default;" src="./components/dataManager/assets/bin.png" class="binButton data-manager-row-button">
                        </div>
                    </div>
                    
                    <div class="data-row-container" id="data-row-template">
                        <div class="data-row">
                            <div class="index-data-manager data-manager-data-field"></div>
                            <div class="time-data-manager data-manager-data-field"></div>
                            <div class="latitude-data-manager data-manager-data-field"></div>
                            <div class="longitude-data-manager data-manager-data-field"></div>
                            <div class="altitude-data-manager data-manager-data-field"></div>
                            <div class="velocity-data-manager data-manager-data-field"></div>
                            <div class="solar-latitude-data-manager data-manager-data-field"></div>
                            <div class="solar-longitude-data-manager data-manager-data-field"></div>
                            <div class="visibility-data-manager data-manager-data-field"></div>
                            <div class="footprint-data-manager data-manager-data-field"></div>
                        </div>
                        <div class="data-row-gadgets">
                            <img onclick="copyRowData(event)" src="./components/dataManager/assets/copy.png" class="copyButton data-manager-row-button">
                            <!-- <img onclick="deleteRow(event)" src="./components/dataManager/assets/bin.png" class="binButton data-manager-row-button"> -->
                            <label class="bin-b	utton data-manager-row-button" for="myCheckbox">
                                <input checked type="checkbox" id="myCheckbox" name="myCheckbox">
                            </label>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div class="metadata-container">
                <div id="metadata">
                    <div class="meta-field">
                        <div class="meta-field-title">source: </div>
                        <div id="source-meta"></div>
                    </div>
                    <div class="meta-field">
                        <div class="meta-field-title">name: </div>
                        <div id="name-meta"></div>
                    </div>
                    <div class="meta-field">
                        <div class="meta-field-title">id: </div>
                        <div id="id-meta"></div>
                    </div>
                    <div class="meta-field">
                        <div class="meta-field-title">units: </div>
                        <div id="units-meta">{{ units }}</div>
                    </div>
                    <div class="meta-field">
                        <div class="meta-field-title">rows: </div>
                        <div id="rows-meta"></div>
                    </div>
                    <div class="meta-field">
                        <div class="meta-field-title">columns: </div>
                        <div id="columns-meta"></div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    `
})