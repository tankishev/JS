function dayOfWeek(day){
    const dict = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 7
    }
    if (day in dict){
        console.log(dict[day]);
    } else {
        console.log('error')
    }
}

dayOfWeek("Monday");
dayOfWeek("input");