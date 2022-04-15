function tseam(input){
    
    let gamesArray = Array.from(input[0].split(' '));
    const commandsArray = Array.from(input.slice(1, input.indexOf('Play!')));
    for (let i = 0; i < commandsArray.length; i++){
        let commandArgs = Array.from(commandsArray[i].split(' '));
        let command = commandArgs[0];
        if (command == 'Expansion'){
            args = commandArgs[1].split('-');
            let game = args[0];
            let expansion = `${game}:${args[1]}`;
            if (gamesArray.includes(game)){
                gamesArray.splice(gamesArray.indexOf(game) + 1, 0, expansion);
            }
        } else {
            let game = commandArgs[1];
            if (command == 'Install' && !gamesArray.includes(game)) {
                gamesArray.push(game);
            } else if (command == 'Uninstall') {
                gamesArray = gamesArray.filter(el => el != game);
            } else if (command == 'Update' && gamesArray.includes(game)) {
                gamesArray.push(gamesArray.splice(gamesArray.indexOf(game), 1)[0]);
            } 
        }
    }
    console.log(gamesArray.join(' '));
}

tseam(['CS WoW Diablo',
'Install LoL',
'Uninstall WoW',
'Update Diablo',
'Expansion CS-Go',
'Play!']
);
tseam(['CS WoW Diablo',
'Uninstall XCOM',
'Update PeshoGame',
'Update WoW',
'Expansion Civ-V',
'Play!']
);