'use strict'

const USER_PREF_OBJ_KEY = 'user-pref-DB'
var gPrefs = {}




function savePrefs(userPrefs){
    gPrefs = userPrefs
    _savePrefsToStorage()
    console.log(gPrefs);
}



function getUserPrefs(){
   return loadFromStorage(USER_PREF_OBJ_KEY)
}

function _savePrefsToStorage() {
    saveToStorage(USER_PREF_OBJ_KEY, gPrefs)
}