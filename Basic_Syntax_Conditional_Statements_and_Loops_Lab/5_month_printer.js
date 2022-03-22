// Write a program, that takes an integer as a parameter and prints the corresponding month. If the number is more than 12 or less than 1 print "Error!"
// 
// Input
//      You will receive a single number.
// Output
//      If the number is within the boundaries print the corresponding month, otherwise print "Error!"

function get_month(num) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(1 <= num && num <= months.length ? months[num - 1] : 'Error!')
}

get_month(12)
get_month(13)