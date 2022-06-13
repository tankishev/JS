function calcTriangleAreaFromSides(sideA, sideB, sideC){
    sideA = Number(sideA);
    sideB = Number(sideB);
    sideC = Number(sideC);
    let s = (sideA + sideB + sideC) / 2;
    let area = Math.sqrt((s - sideA) * (s - sideB) * (s - sideC) * s)
    console.log(area)
}

calcTriangleAreaFromSides(2, 3.5, 4)