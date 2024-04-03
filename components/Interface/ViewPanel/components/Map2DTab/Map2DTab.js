app.component('map2D-tab', {
    template:
    /*html*/
    `
    <div class="display-system" id="map2D-container">
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

    `
    ,
    props: {
        tracking: {
            type: Boolean,
            required: true
        }
    }
})