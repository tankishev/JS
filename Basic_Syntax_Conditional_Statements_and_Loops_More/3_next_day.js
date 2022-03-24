function getNextDay(year, month, day){
    let result = new Date(year, month - 1, day);
    result.setDate(result.getDate() + 1);
    console.log(`${result.getFullYear()}-${result.getMonth() + 1}-${result.getDate()}`);
}

getNextDay(2016, 9, 30)
getNextDay(2020, 3, 24)