function requiredReading(pagesInBook, pagesReadPerHour, daysToReadBook){
    let hoursToRead = (pagesInBook / pagesReadPerHour) / daysToReadBook;
    console.log(hoursToRead);
}

requiredReading(212,20,2)