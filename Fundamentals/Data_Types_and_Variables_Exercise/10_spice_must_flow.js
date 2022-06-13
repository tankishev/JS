function spiceMustFlow(startingYield){
    startingYield = Number(startingYield);
    let extractedSpice = 0;
    let days = 0
    while (startingYield >= 100){
        days += 1
        extractedSpice += startingYield
        startingYield -= 10
        extractedSpice -= Math.min(extractedSpice, 26)
    }
    extractedSpice -= Math.min(extractedSpice, 26)
    console.log(days)
    console.log(extractedSpice)
}

spiceMustFlow(111);
spiceMustFlow(450);