function yesterday(year, month, day){
    const _msPerDay = 1000 * 60 * 60 * 24;
    const today = new Date(year, month - 1, day);
    let yesterday = new Date(today - _msPerDay);
    console.log(`${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`)
}
yesterday(2016, 9, 30);
yesterday(2016, 10, 1);