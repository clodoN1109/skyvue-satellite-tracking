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
        mountedApp.data_update_rate = value * 1000;

        if (value == 1) {mountedApp.loader_time = 500;}
        // Parameter to cut avoid ploting points near the satellite's figure,
        // and responsive to the selected value for the data_update_rate parameter.
        else {mountedApp.loader_time = 1000;}
    }

    if (id === 'display-update-time'){ 
        mountedApp.display_framerate = value * 1000; 
    }

    if (id === 'line-level-detail'){ 
        mountedApp.line_level_detail = value; 
    }

    mountedApp.intervals.forEach(element => {
        clearInterval(element);    
    });
    mountedApp.intervals.length = 0;

    const interval_UpdateData = setInterval(() => {

        fetchCurrentState(mountedApp.selected_satellite, mountedApp.object_path);  
        
    }, mountedApp.data_update_rate);
    mountedApp.intervals.push(interval_UpdateData);

    const interval_UpdateDataDisplay = setInterval(() => {

        updateMap([[mountedApp.object_path.slice(0, -3), mountedApp.line_level_detail]]); 
        updateObjectPosition(mountedApp.object_path);
        updateNationalFlagPosition(mountedApp.object_path);

    }, mountedApp.display_framerate);
    mountedApp.intervals.push(interval_UpdateDataDisplay);
}