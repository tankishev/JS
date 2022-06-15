function updateArray(commandsArr){
    let retval = [];
    for (let i = 1; i <= commandsArr.length; i++){
        if (commandsArr[i - 1] == 'add'){
            retval.push(i);
        } else {
            retval.pop()
        }
    }
    retval.length == 0 ? console.log('Empty') : console.log(retval.join('\n'));
}

updateArray(['add', 'add', 'add', 'add']);
updateArray(['add', 'add', 'remove', 'add', 'add']);
updateArray(['remove', 'remove', 'remove']);