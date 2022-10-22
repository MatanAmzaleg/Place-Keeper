'use strict'

const USER_PREF_OBJ_KEY = 'user-pref-DB'
let gPrefs = loadFromStorage(USER_PREF_OBJ_KEY) || {}

function savePrefs(userPrefs){
    gPrefs = userPrefs
    _savePrefsToStorage()
}

function getUserPrefs(){
   return loadFromStorage(USER_PREF_OBJ_KEY)
}

function _savePrefsToStorage() {
    saveToStorage(USER_PREF_OBJ_KEY, gPrefs)
}