function timeToWalk(steps, footprint, speed){
    let distanceToSchool = footprint * steps
    let breaks = Math.floor(distanceToSchool / 500) * 60
    let speedInMS = speed * 1000 / 3600

    let time = Math.round(distanceToSchool / speedInMS) + breaks
    let seconds = time % 60
    time = (time - seconds) / 60
    let minutes = time % 60
    hours = (time - minutes) / 60

    seconds = seconds.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')
    hours = hours.toString().padStart(2, '0')
    console.log(`${hours}:${minutes}:${seconds}`)
}

timeToWalk(4000, 0.60, 5);
timeToWalk(2564, 0.70, 5.5);