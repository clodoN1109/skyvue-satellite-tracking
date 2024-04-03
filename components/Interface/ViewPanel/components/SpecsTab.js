app.component('specs-tab', {
    template: 
    /*html*/
    `
    <div class="display-system" id="specs-container">
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
    `
})