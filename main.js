// State history of object.
const iss_path = [[0,0,0,0,0]];

const intervalWiki = setInterval(updateWikiInfo, 10000);
const intervalFetch = setInterval(fetchIssData, 3000);
const intervalDraw = setInterval(draw(iss_path), 3000);
const intervalUpdateObject = setInterval(updateObjectPosition(iss_path), 3000);
const intervalUpdateFlag = setInterval(setNationalFlag(iss_path), 3000);


