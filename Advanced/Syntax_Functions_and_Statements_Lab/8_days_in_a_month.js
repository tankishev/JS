function getDaysInMonth(month, year){
    const _msPerDay = 1000 * 60 * 60 * 24;
    const currentDate = new Date(Number(year), Number(month) - 1, 1);
    const nextDate = new Date(Number(year), Number(month), 1);

    let dateDiff = (nextDate - currentDate) / _msPerDay;
    console.log(dateDiff.toFixed(0));
}

getDaysInMonth(1, 2012);
getDaysInMonth(2, 2021);
getDaysInMonth(2, 2013);
