# ISS-Tracking
 https://clodon1109.github.io/ISS-Tracking/

Objective: Exercise and experimentation on HTML/CSS/Javascript concepts, like fetching data and manipulating the DOM(document object) through Javascript.

This web page project consists of an exercise in collecting data from the internet through API's and using them to dynamically update a page's contents. 
The concepts are implemented in a very straightfoward way, so it can probably help others to study them and to improve it.

The data chosen was on the whereabouts of the International Spatial Station (ISS). 

Longitude and Latitude are fetched from the API https://wheretheiss.at/w/developer and the path is ploted over the map using the <canvas> HTML element.
The satellite's image on the map is an HTML object and it's position is continually altered by manipulating its "transform" attribute using Javascript. 
