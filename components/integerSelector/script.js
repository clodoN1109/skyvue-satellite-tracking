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

}