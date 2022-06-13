function minedGold(dailyMiningArray){
    const goldPrice = 67.51
    const bitcoinPrice = 11949.16
    let goldValue = 0
    let firstDayToPurchaseCoin = 0
    for (let index = 0; index < dailyMiningArray.length; index++){
        goldValue += ((index + 1) % 3 == 0 ? 0.7 : 1) * dailyMiningArray[index] * goldPrice
        if (goldValue > bitcoinPrice && firstDayToPurchaseCoin == 0) {
            firstDayToPurchaseCoin = index + 1
        }
    }
    let count = Math.floor(goldValue/bitcoinPrice)
    let money = goldValue % bitcoinPrice
    console.log(`Bought bitcoins: ${count}`)
    if (count > 0){
        console.log(`Day of the first purchased bitcoin: ${firstDayToPurchaseCoin}`)
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`)
}

minedGold([100, 200, 300])
minedGold([50, 100])
minedGold([3124.15, 504.212, 2511.124])