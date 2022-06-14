function moneyNeeded(fruitType, weightGrams, pricePerKG){
    const weightKG = weightGrams / 1000;
    let price = weightKG * pricePerKG;
    console.log(`I need $${price.toFixed(2)} to buy ${weightKG.toFixed(2)} kilograms ${fruitType}.`);
}

moneyNeeded('orange', 2500, 1.80);
moneyNeeded('apple', 1563, 2.35);