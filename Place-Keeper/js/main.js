'use strict'

function onSavePrefs(ev){
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

function onIndexInit(){
    var userPrefs = getUserPrefs()
    console.log(userPrefs);
    document.querySelector('.title-name-span').innerText = userPrefs.firstName
    document.querySelector('body').style.backgroundColor = userPrefs.bgdColor
    document.querySelector('.main-index-container').style.color = userPrefs.txtColor

}

function onMapInit(){
    renderSavedLocations()
}

function renderSavedLocations(){
    var locations = getGLocations()
    var strHTML = locations.map((location) => `
    <article  class="location-card">
                    <button data-id="${location.id}" onClick="onDeleteLocation(this)" class="delete-location-btn">x</button>
                    <h3>${location.locName}</h3>
                    <p>saved: ${location.date}</p>
                </article>
    `).join('')

    document.querySelector('.list-locations').innerHTML = strHTML
}

function onDeleteLocation(ev){
    console.log(ev.dataset.id);
    deleteLocation(ev.dataset.id)
    renderSavedLocations()
}