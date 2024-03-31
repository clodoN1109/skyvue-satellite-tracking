function openDataManager(){
    prepareDownloadButton();
    document.getElementById('data-manager-container').style.display = 'flex';
}

function closeDataManager(){
    document.getElementById('data-manager-container').style.display = 'none';
}

function updateDataManager(object_path){

    let header = document.getElementById('data-row-template');
    // 'true' indica que você quer clonar os filhos também
    const clone = header.cloneNode(true); 
    
    let table = document.getElementById("data-table");

    newID = 'data-row-' + document.getElementsByClassName('data-row-container').length;

    clone.id = newID;
    clone.style.display = "inline-flex";

    table.appendChild(clone);

    newElement = document.getElementById(newID);

    data_row = newElement.getElementsByClassName('data-row')[0];
    gadgets = newElement.getElementsByClassName('data-row-gadgets')[0];
    

    // object_path[i] = [name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units];
  
    
    // Creating new data row: 
    let index = object_path.length - 1;
    let current_state = object_path[index];

    data_row.getElementsByClassName('index' + '-data-manager')[0].textContent = index;

    Object.keys(current_state).forEach(key => {
        data_field_element = data_row.getElementsByClassName(key + '-data-manager')[0];
        value = current_state[key];

        if ((value != undefined) && (data_field_element != undefined)){
            data_field_element.textContent = value;
        }

        if ((value === undefined) && (data_field_element != undefined)){
            data_field_element.textContent = '-';
        }
    });

    // Updating metadata:
    document.getElementById('source-meta').textContent = mountedApp.source_URL;
    document.getElementById('name-meta').textContent =  object_path[index]['name'];
    document.getElementById('id-meta').textContent =  object_path[index]['id'];
    

    let units_options = document.getElementById('units-system-field').getElementsByTagName('option');
    for (let index = 0; index < units_options.length; index++) {
        const element = units_options[index];
        if (element.selected == true) {
            document.getElementById('units-meta').textContent = element.textContent;
        }
        
    }
    
    
    document.getElementById('rows-meta').textContent =  document.getElementsByClassName('data-row').length - 4;
    document.getElementById('columns-meta').textContent = document.getElementById('data-row-header').getElementsByClassName('data-manager-header-field').length;

}

function prepareDownloadButton(){

    // // object_path[i] = [name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units];
    // let header = [['name', 'id', 'latitude', 'longitude', 'altitude', 'velocity', 'visibility', 'footprint', 'time', 'daynum', 'solar_lat', 'solar_lon', 'units']];
    
    // // Concatenate the arrays (creates a new array)
    // var combinedArray = header.concat(object_path);
    
    // for (let i = 0; i < combinedArray.length; i++) {
    //     for (let j = 0; j < combinedArray[i].length; j++) {
    //         combinedArray[i][j] = combinedArray[i][j].toString();
    //     }
    // }
      
    // const csvContent = combinedArray.map(row => row.join(',')).join('\n');
    // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // downloadButton =  document.getElementById('download-button');
    // downloadButton.href = URL.createObjectURL(blob);
    // downloadButton.download = document.getElementById('name-meta').textContent + '.csv';
    
    
}
