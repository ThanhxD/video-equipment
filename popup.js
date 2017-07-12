let currentTab = null;

chrome.tabs.query({'active': true}, (tabs) => {
    currentTab = tabs[0];
})

window.onload = () => {
    let volControl = document.getElementById('control');
    let span = document.getElementsByTagName('span')[0];
    let brightness = document.getElementById('brightness');
    let brightnessValue = 4;
    let volumeValue = 1;

    volControl.value = volumeValue;
    span.innerHTML = volumeValue;

    volControl.oninput = () => {
        volumeValue = volControl.value;
        span.innerHTML = volumeValue;
        setVolume(volumeValue);
    }

    brightness.onclick = () => {
        if (brightnessValue <= 3) {
            brightnessValue++;
        } else {
            brightnessValue = 1;
        }
        brightness.style.opacity = brightnessValue*0.25;
        setBrightness(brightnessValue);
    }

}

function setVolume(value) {
    if (currentTab) {
        chrome.tabs.sendMessage(currentTab.id, {
            method: 'set_volume',
            value: value
        }, (response) => {
            //console.log(response);
        })
    }
}

function setBrightness(value) {
    if (currentTab) {
        chrome.tabs.sendMessage(currentTab.id, {
            method: 'set_brightness',
            value: value
        }, (response) => {
            //console.log(response);
        })
    }
}