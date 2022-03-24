function distanceBetweenPoints(x1, y1, x2, y2){
    let xDiff = Number(x1 - x2)
    let yDiff = Number(y1 - y2)
    let distance = Math.sqrt(xDiff ** 2 + yDiff ** 2)
    console.log(distance)
}

distanceBetweenPoints(2, 4, 5, 0)
distanceBetweenPoints(2.34, 15.66, -13.55, -2.9985)