function openDataManager(){
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
    data_row.getElementsByClassName('time' + '-data-manager')[0].textContent = object_path[object_path.length - 1][8];
    data_row.getElementsByClassName('latitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][2];
    data_row.getElementsByClassName('longitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][3];
    data_row.getElementsByClassName('altitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][4];
    data_row.getElementsByClassName('velocity' + '-data-manager')[0].textContent = object_path[object_path.length - 1][5];
    data_row.getElementsByClassName('visibility' + '-data-manager')[0].textContent = object_path[object_path.length - 1][6];
    data_row.getElementsByClassName('footprint' + '-data-manager')[0].textContent = object_path[object_path.length - 1][7];
    data_row.getElementsByClassName('solar-latitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][10];
    data_row.getElementsByClassName('solar-longitude' + '-data-manager')[0].textContent = object_path[object_path.length - 1][11];


}