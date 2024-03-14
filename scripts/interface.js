function selectOption(event) {

    elementClass = event.target.className;

    options = document.getElementsByClassName(elementClass);

    for (let index = 0; index < options.length; index++) {
        options[index].style.opacity = 0.5;
        options[index].style.fontWeight = 300;
    }

    event.target.style.opacity = 1;
    event.target.style.fontWeight = 700;

    changeInterfaceState(event.target.id);

}

// Possible states: specs, map2D, map3D, altitude, statistics, forecast.
function changeInterfaceState(option_ID){

    newState = option_ID.substring(0, option_ID.indexOf('-'));

    for (child of document.getElementsByClassName("display-system")) {
        child.style.display = 'none';
    }

    document.getElementById(newState + "-container").style.display = 'flex';
    
    
    pageStates['interface_state'] = newState;

}

