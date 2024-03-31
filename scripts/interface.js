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


