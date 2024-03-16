// const pageStates = {interface_state:'2D'};

function selectTab(event) {

    elementClass = event.target.className;

    tabs = document.getElementsByClassName(elementClass);

    for (let index = 0; index < tabs.length; index++) {
        tabs[index].style.opacity = 0.5;
        tabs[index].style.borderBottomStyle = "solid";
        tabs[index].style.borderWidth = "0.1px 0.1px 3px 0.1px";
        tabs[index].style.fontWeight = 300;
    }

    event.target.style.opacity = 0.9;
    event.target.style.borderBottomStyle = "dashed";
    event.target.style.borderWidth = "3px 3px 0.1px 3px";
    event.target.style.fontWeight = 500;

    changeInterfaceState(event.target.id);

}

function selectDataTab(event) {

    elementClass = event.target.className;

    tabs = document.getElementsByClassName(elementClass);

    for (let index = 0; index < tabs.length; index++) {
        tabs[index].style.opacity = 0.5;
        tabs[index].style.borderBottomStyle = "solid";
        tabs[index].style.borderWidth = "0.1px 0.1px 3px 0.1px";
        tabs[index].style.fontWeight = 300;
    }

    event.target.style.opacity = 0.9;
    event.target.style.borderBottomStyle = "dashed";
    event.target.style.borderWidth = "3px 3px 0.1px 3px";
    event.target.style.fontWeight = 500;

    changeDataDisplayState(event.target.id);

}

// Possible states: specs, map2D, map3D, altitude, statistics, forecast.
function changeInterfaceState(tab_ID){

    newState = tab_ID.substring(0, tab_ID.indexOf('-'));

    for (child of document.getElementsByClassName("display-system")) {
        child.style.display = 'none';
    }

    document.getElementById(newState + "-container").style.display = 'flex';
    
    pageStates['interface_state'] = newState;

    if (["specs", "statistics", "forecast"].includes(pageStates['interface_state'])) {

        for (child of document.getElementsByClassName("label")) {
            child.style.opacity = 0;
        }

        document.getElementById("date-panel").style.color = "transparent";
        document.getElementById("date-panel").style.backgroundColor = "transparent";
        document.getElementById("date-panel").style.borderWidth = "0 3px 0 3px";
    }
    else {

        for (child of document.getElementsByClassName("label")) {
            child.style.opacity = 1;
        }

        document.getElementById("date-panel").style.color = "rgb(255,255,255)";
        document.getElementById("date-panel").style.backgroundColor = "rgba(31, 28, 28, 0.754)";
        document.getElementById("date-panel").style.borderWidth = "0 3px 2px 3px";
    }


}

function changeDataDisplayState(tab_ID){

    newState = tab_ID.substring(0, tab_ID.indexOf('-'));

    for (child of document.getElementsByClassName("data-container")) {
        child.style.display = 'none';
    }

    document.getElementById(newState + "-container").style.display = 'flex';
    
    pageStates['data_display'] = newState;



}
