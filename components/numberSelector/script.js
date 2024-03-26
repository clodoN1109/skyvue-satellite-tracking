function increment(id) {

    let integerInput = document.getElementById(id);

    const currentValue = parseInt(integerInput.value);
    if (currentValue >= 100) {return}

    integerInput.value = (currentValue + 1);
 
    updateConfigurationParameters(id, integerInput.value);

}

function decrement(id) {

    let integerInput = document.getElementById(id);

    const currentValue = parseInt(integerInput.value);
    if (currentValue <= 1) {return}

    integerInput.value = (currentValue - 1).toPrecision(2);
   
    updateConfigurationParameters(id, integerInput.value);

}

function updateConfigurationParameters(id, value){
           


    if (id === 'data-update-time')
    { 
        data_update_rate = value * 1000;

        if (value == 1) {loader_time = 500;}
        // Parameter to cut avoid ploting points near the satellite's figure,
        // and responsive to the selected value for the data_update_rate parameter.
        else {loader_time = 1000;}
    }

    if (id === 'display-update-time'){ 
        display_framerate = value * 1000; 
    }

    if (id === 'line-level-detail'){ 
        line_level_detail = value; 
    }

    intervals.forEach(element => {
        clearInterval(element);    
    });
    intervals.length = 0;

    const interval_UpdateData = setInterval(() => {

        fetchCurrentState(mountedApp.selected_satellite, object_path);  
        
    }, data_update_rate);
    intervals.push(interval_UpdateData);

    const interval_UpdateDataDisplay = setInterval(() => {

        updateMap([[object_previous_path, 100], [object_path.slice(0, -3), line_level_detail]]); 
        updateObjectPosition(object_path);
        updateNationalFlagPosition(object_path);

    }, display_framerate);
    intervals.push(interval_UpdateDataDisplay);
}