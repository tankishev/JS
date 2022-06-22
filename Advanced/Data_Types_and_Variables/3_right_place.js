function rightPlace(stringOne, char, stringTwo){
    let newString = stringOne.replace('_', char);
    console.log(newString == stringTwo ? 'Matched' : 'Not Matched')
}

rightPlace('IronM_n', 'a', 'IronMan')