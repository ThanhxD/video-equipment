let videoNode, context, source, gainNode;

videoNode = document.querySelector('.video-stream.html5-main-video');
context = new AudioContext();
source = context.createMediaElementSource(videoNode);
gainNode = context.createGain();
source.connect(gainNode);
gainNode.connect(context.destination);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.method) {
        case 'set_volume': {
            let done = setVolume(msg.value);
            sendResponse('set Volume to: '+ msg.value + ' - ' + done);
            return;
        }
        case 'set_brightness': {
            let done = setBrightness(msg.value);
            sendResponse('set Brightness to: ' + msg.value + ' - ' + done);
            return;
        }
        default: sendResponse('invalid method');
    }
})

function setVolume(value) {
    if (!videoNode) return false;
    if (videoNode && context && source && gainNode) {
        gainNode.gain.value = value * 50;    
    }
    return true;
}

function setBrightness(value) {
    if (!videoNode) return false;
    videoNode.style['-webkit-filter']  = `contrast(${value*0.25})`;
    videoNode.style['filter'] = `contrast(${value*0.25})`;
    return true;
}