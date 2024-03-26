function initializeInterface(){

    const interval_Wiki = setInterval(updateWikiInfo, 10000);

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
    
}

function selectViewerTab(element) {

    function changeViewerState(element){

        tab_ID = element.id;
    
        newState = tab_ID.substring(0, tab_ID.indexOf('-'));

        mountedApp.viewer_state = newState;
    
    }

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

    changeViewerState(element);

}

function selectDataTab(element) {

    function changeDataDisplayState(element){

        tab_ID = element.id;
    
        newState = tab_ID.substring(0, tab_ID.indexOf('-'));

        mountedApp.data_display_state = newState;

    }

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


    changeDataDisplayState(element);

}


