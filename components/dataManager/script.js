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
    data_row.getElementsByClassName('index' + '-data-manager')[0].textContent = object_path.length - 1;
    data_row.getElementsByClassName('latitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][2];
    data_row.getElementsByClassName('longitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][3];
    data_row.getElementsByClassName('altitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][4];
    data_row.getElementsByClassName('velocity' + '-data-manager')[0].textContent = object_path[object_path.length - 1][5];
    data_row.getElementsByClassName('visibility' + '-data-manager')[0].textContent = object_path[object_path.length - 1][6];
    data_row.getElementsByClassName('footprint' + '-data-manager')[0].textContent = object_path[object_path.length - 1][7];
    data_row.getElementsByClassName('time' + '-data-manager')[0].textContent = object_path[object_path.length - 1][8];
    data_row.getElementsByClassName('solar-latitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][10];
    data_row.getElementsByClassName('solar-longitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][11];

    // Updating metadata:
    document.getElementById('source-meta').textContent = source_URL;
    document.getElementById('name-meta').textContent =  object_path[object_path.length - 1][0];
    document.getElementById('id-meta').textContent =  object_path[object_path.length - 1][1];
    

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

    // object_path[i] = [name, id, latitude, longitude, altitude, velocity, visibility, footprint, time, daynum, solar_lat, solar_lon, units];
    let header = [['name', 'id', 'latitude', 'longitude', 'altitude', 'velocity', 'visibility', 'footprint', 'time', 'daynum', 'solar_lat', 'solar_lon', 'units']];
    
    // Concatenate the arrays (creates a new array)
    var combinedArray = header.concat(object_path);
    
    for (let i = 0; i < combinedArray.length; i++) {
        for (let j = 0; j < combinedArray[i].length; j++) {
            combinedArray[i][j] = combinedArray[i][j].toString();
        }
    }
      
    const csvContent = combinedArray.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    downloadButton =  document.getElementById('download-button');
    downloadButton.href = URL.createObjectURL(blob);
    downloadButton.download = document.getElementById('name-meta').textContent + '.csv';
    
    
}
