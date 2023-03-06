
let rollingAverageSpeeds = new Object();
function initEngagementEnhancer(callback) {
    document.addEventListener('mousemove', (event) => {
        rollingAverageSpeeds[event.timeStamp] = Math.abs(event.movementX) + Math.abs(event.movementY)
        interval = setInterval(function() {
            rollingAverageSpeeds[event.timeStamp] *= 0.8;
            // TODO: this doesn't seem to work
        }, 50);
        setTimeout(function() { 
            clearInterval(interval);
            delete rollingAverageSpeeds[event.timeStamp];
        }, 1500)
    }); 
    
    setInterval(function() {
        if (Object.keys(rollingAverageSpeeds).length > 10) {
            console.log(rollingAverageSpeeds)
            let totalSum = 0;
            for (const [key, value] of Object.entries(rollingAverageSpeeds)) {
                if (!isNaN(value)) {
                    totalSum += Math.round(value);
                }
            }

            if (totalSum < 30) {
                console.log("Trigger!!")
                callback();
            }
        }
    }, 200)
}
