function centuriesToMinutes(numberCenturies){
    let years = 100 * numberCenturies;
    let days = Math.floor(years * 365.2422);
    let hours = days * 24;
    let minutes = hours * 60;
    console.log(`${numberCenturies} centuries = ${years.toFixed(0)} years = ${days.toFixed(0)} days = ${hours.toFixed(0)} hours = ${minutes.toFixed(0)} minutes`);
}

centuriesToMinutes(1)
centuriesToMinutes(5)