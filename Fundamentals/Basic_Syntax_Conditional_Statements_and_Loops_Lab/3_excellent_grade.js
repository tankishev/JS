// Write a function that receives a single number and checks if the grade is excellent or not. 
// If it is, print "Excellent", otherwise print "Not excellent".

function is_excellent(grade) {
    if (grade >= 5.50 ) {
        console.log('Excellent')
    } else {
        console.log('Not excellent')
    }
}

is_excellent(5.50)
is_excellent(4.50)