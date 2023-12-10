"permissions":["storage","tabs"],
// in this line "storage" refers to the chrome.storage api (to store user's data for the extension) and "tabs" refer to the chrome.tabs api (to access the current tab of the user , to access if the user is in a youtube page or not)

"background":{
"service_worker":"background.js"
},

    // "service_workers" dosen't access a webpage but using extensions messaging system it speaks to the extension


       "content_scripts":{
        "matches":["https://*.youtube.com/*"],
        "js":["contentScript.js"]
    }

    // "content_scripts" works with the webpage, the extension is working on..., used to manipulate the working page's DOM
