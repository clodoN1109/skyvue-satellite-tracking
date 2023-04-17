# ISS-Tracking
 https://clodon1109.github.io/ISS-Tracking/

<img width="907" alt="snapshot" src="https://user-images.githubusercontent.com/104923248/203157589-e12c476a-a628-48e3-8678-95808930bf1d.png">

Webpage for visualizing the current path of the International Space Station.

This webpage project consists of an exercise in collecting data from the internet through API's and using them to dynamically update a page's contents.  

Note: Longitude and Latitude are fetched from the API https://wheretheiss.at/w/developer and the path is ploted over the map using the <canvas> HTML element.
The satellite's image on the map is an HTML object and it's position is continually altered by manipulating its "transform" attribute using Javascript. 
