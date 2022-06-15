function reverseString(inputString){
    let outputString = String(inputString).split("").reverse().join("")
    console.log(outputString)
}

reverseString('Hello')
reverseString('SoftUni')
reverseString(1234)