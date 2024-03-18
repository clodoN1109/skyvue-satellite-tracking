function increment(id) {

    let integerInput = document.getElementById(id);

    const currentValue = parseInt(integerInput.value);
    if (currentValue >= 60) {return}
    else{
        integerInput.value = (currentValue + 1).toPrecision(2);
 
        updateConfigurationParameters(id, integerInput.value);
    }

}

function decrement(id) {

    let integerInput = document.getElementById(id);

    const currentValue = parseInt(integerInput.value);
    if (currentValue <= 1) {return}
    else{
        integerInput.value = (currentValue - 1).toPrecision(2);
    }

    updateConfigurationParameters(id, integerInput.value);

}

function updateConfigurationParameters(id, value){
           
    if (id === 'data-update-time')
    { 
        data_update_rate = value * 1000;
    }

    if (id === 'display-update-time'){ 
        display_framerate = value * 1000; 
    }

    intervals.forEach(element => {
        clearInterval(element);    
    });
    intervals.length = 0;

    const interval_UpdateData = setInterval(() => {

        fetchCurrentState(object_path);  
    
    }, data_update_rate);
    intervals.push(interval_UpdateData);

    const interval_UpdateDataDisplay = setInterval(() => {

        updateMap([[object_previous_path, 1], [object_path.slice(0, -10), 25]]); 
        updateObjectPosition(object_path);
        updateNationalFlagPosition(object_path);

    }, display_framerate);
    intervals.push(interval_UpdateDataDisplay);
}