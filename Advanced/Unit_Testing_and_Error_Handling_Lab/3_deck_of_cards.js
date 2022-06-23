function printDeckOfCards(cards) {
    const validDeck = [];
    for (const el of cards){
        try {
            let card = createCard(el.slice(0,-1), el.slice(-1));
            validDeck.push(card.toString());
        } catch (error) {
            console.log(`Invalid card: ${el}`);
            return;   
        }
    }
    console.log(validDeck.join(' '));
    
    function createCard (face, suit){
        const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        const validSuits = {
            'S': '\u2660',
            'H': '\u2665',
            'D': '\u2666',
            'C': '\u2663'
        }
        if (!validFaces.includes(face)){
            throw new Error('Invalid face');
        }
        if (!(suit in validSuits)){
            throw new Error('Invalid suit');
        }
        let card = {
            face,
            suit: validSuits[suit],
            toString() {return card.face + card.suit}
        }
        return card;
    }
}
  
printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);
printDeckOfCards(['3D', 'JS', '2C', '5X'])
  