'use strict'

var gLocations
const LOCATIONS_STORAGE_KEY ='locationsDB'
createLocations()

function createLocations(){
    var locations = loadFromStorage(LOCATIONS_STORAGE_KEY)

    if(!locations || !locations.length){
        locations = []
        locations.push(createLocation())
    }
gLocations = locations
saveLocationsToStorage()
}

function _createLocation(lat = 31.783012, lng = 34.631833, locName = 'home') {
    return {
        id: makeId(),
        lat,
        lng,
        locName,
        date: getCurrDate()
    }
}

function getGLocations(){
    return gLocations
}

function getCurrDate(){
    var date = new Date(Date.now())
    var year = date.getFullYear();
var month = ("0" + (date.getMonth() + 1)).substr(-2);
var day = ("0" + date.getDate()).substr(-2);
var hour = ("0" + date.getHours()).substr(-2);
var minutes = ("0" + date.getMinutes()).substr(-2);
return (day + "-" + month + "-" + year  + " " + hour + ':' + minutes)
}

function deleteLocation(locationId){
    var locationIdx = gLocations.findIndex(location => location.id === locationId)
    gLocations.splice(locationIdx, 1)
    saveLocationsToStorage()
    initMap()
}

function saveLocationToLocationsList(loc){
    console.log(loc);
    var locName = prompt('Enter prompt name')
    gLocations.push(_createLocation(loc.lat , loc.lng, locName))
    saveLocationsToStorage()
    renderSavedLocations()
}

let map;

function initMap() {
    map = new google.maps.Map(document.querySelector(".map-container"), {
        center: { lat: 31.783012, lng: 34.631833 },
        zoom: 15,
    });
console.log(gLocations);
    var markers = gLocations.map(location =>{
      return  new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
        })
    })
    console.log(markers);
    
    
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
        saveLocationToLocationsList(e.latLng.toJSON())
      });
    
}

function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }

window.initMap = initMap;



function saveLocationsToStorage(){
    saveToStorage(LOCATIONS_STORAGE_KEY, gLocations)
}
