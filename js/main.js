'use strict'

function onSavePrefs(ev) {
    ev.preventDefault()
    var userPrefs = {
        firstName: document.querySelector('#name').value,
        zoomFactor: document.querySelector('#zoom').value,
        bgdColor: document.querySelector('#bcg-color').value,
        txtColor: document.querySelector('#txt-color').value
    }
    savePrefs(userPrefs)
    window.location.href = 'index.html'
    return userPrefs
}

function showZoom(newVal) {
    document.getElementById('sZoom').innerHTML = newVal
}

function onUserPrefsInit() {
    var userPrefs = getUserPrefs()
    document.querySelector('body').style.backgroundColor = userPrefs.bgdColor
    document.querySelector('.form-pref-container').style.color = userPrefs.txtColor
}

function onIndexInit() {
    var userPrefs = getUserPrefs()
    document.querySelector('.title-name-span').innerText = userPrefs.firstName
    document.querySelector('body').style.backgroundColor = userPrefs.bgdColor
    document.querySelector('.main-index-container').style.color = userPrefs.txtColor

}

function onMapInit() {
    var userPrefs = getUserPrefs()
    document.querySelector('body').style.backgroundColor = userPrefs.bgdColor
    document.querySelector('.main-map-container').style.color = userPrefs.txtColor
    getPosition()
    renderSavedLocations()
}

function renderSavedLocations() {
    var locations = getGLocations()
    console.log(locations);
    var strHTML = locations.map((location) => `
    <article onClick="onRelocate(${location.lat}, ${location.lng})" class="location-card">
                    <button data-id="${location.id}" onClick="onDeleteLocation(this)" class="delete-location-btn">x</button>
                    <h3>${location.locName}</h3>
                    <p>saved: ${location.date}</p>
                </article>
    `).join('')

    document.querySelector('.list-locations').innerHTML = strHTML
}

function onDeleteLocation(ev) {
    console.log(ev.dataset.id);
    deleteLocation(ev.dataset.id)
    renderSavedLocations()
    initMap()
}

let map

function initMap() {
    const locations = getGLocations()
    const userPrefs = getUserPrefs()
    map = new google.maps.Map(document.querySelector(".map-container"), {
        center: { lat: 31.783012, lng: 34.631833 },
        zoom: +userPrefs.zoomFactor,
    });
    locations.forEach(location => {
        new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
        })
    })

    const locationButton = document.createElement("button");

    locationButton.innerHTML = '<img class="location-img" src="img/my-location.png" alt="">';
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(showLocation)

    });


    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
        onSaveLocation(e.latLng.toJSON())

    });

}

function onSaveLocation(letlng) {
    var locName = prompt('enter location name')
    saveLocationToLocationsList(letlng, locName)
}

function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
        position: latLng,
        map,
    });
    map.panTo(latLng);
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation)
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}

function showLocation(position) {
    console.log(position)
    initMap(position.coords.latitude, position.coords.longitude)
}

function onRelocate(lat, lng) {
    relocate(lat, lng)
}



