function dayOfWeek(dayNumber){
    dayNumber = Number(dayNumber);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let result = (dayNumber > 0 && dayNumber < 8) ? weekdays[dayNumber-1] : 'Invalid day!'
    console.log(result)
}