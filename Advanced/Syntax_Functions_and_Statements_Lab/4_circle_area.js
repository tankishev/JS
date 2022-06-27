function circleArea(radius){
    if (typeof radius != 'number'){
        let inputType = typeof(radius)
        console.log(`We can not calculate the circle area, because we receive a ${inputType}.`);
    } else {
        let area = Math.pow(radius,2) * Math.PI;
        console.log(area.toFixed(2));
    }
}

circleArea(0);
circleArea('name')