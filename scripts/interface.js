function selectOption(event) {

    elementClass = event.target.className;

    options = document.getElementsByClassName(elementClass);

    for (let index = 0; index < 6; index++) {
        options[index].style.opacity = 0.5;
        options[index].style.fontWeight = 300;
    }

    event.target.style.opacity = 1;
    event.target.style.fontWeight = 700;

    changeInterfaceState(event.target.textContent);

}

function changeInterfaceState(newState){
    pageStates['interfaceState'] = newState;
}