function addAndRemoveFromArray(commands){
    const commandsArray = Array.from(commands);
    let i = 0;
    let output = []
    for (element of commandsArray){
        i ++
        if (element == 'add'){
            output.push(i)
        } else {
            output.pop()
        }
    }
    console.log(output.length > 0 ? output.join(' ') : 'Empty')
}

addAndRemoveFromArray(['add', 'add', 'add', 'add'])
addAndRemoveFromArray(['add', 'add', 'remove', 'add', 'add'])
addAndRemoveFromArray(['remove', 'remove', 'remove'])