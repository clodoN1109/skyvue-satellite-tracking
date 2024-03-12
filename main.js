// State history of object.
const iss_path = [];

const interval_Wiki = setInterval(updateWikiInfo, 10000);
const interval_ISS = setInterval(() => {fetchData(iss_path);  drawPoints(iss_path); updateObjectPosition(iss_path); setNationalFlag(iss_path);}, 3000);


