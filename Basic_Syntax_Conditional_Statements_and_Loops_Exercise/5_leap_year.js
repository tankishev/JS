function is_leap_year(year) {
    let result =
        (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) ? 'yes' : 'no'
    console.log(result)
}

is_leap_year(1984)
is_leap_year(2003)
is_leap_year(4)