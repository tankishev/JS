// Write a program that prints the next n odd numbers (starting from 1) and on the last row prints the sum of them.
//      Input
// You will receive a number – n. This number shows how many odd numbers you should print.
//      Output
// Print the next n odd numbers, starting from 1, separated by newlines.
// On the last line, print the sum of these numbers in the following format: `Sum: {total sum}`

function odd_numbers(n){
    let retval = 0;
    let i = 1
    while (n > 0){
        if (i % 2 != 0){
            console.log(i);
            retval += i;
            n--
        }
        i++        
    }
    console.log(`Sum: ${retval}`)
}

odd_numbers(5);
odd_numbers(3);