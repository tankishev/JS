function calculatePyramidMaterials(baseWidth, layerHeight){
    let currentLayer = 0;
    let requiredStone = 0;
    let requiredMarble = 0;
    let requiredLapisLazuli = 0;
    let requiredGold = 0;

    while (baseWidth > 0){
        currentLayer += 1;
        requiredStone += baseWidth > 2 ? (baseWidth - 2) ** 2 : 0;
        if (baseWidth <= 2) {
            requiredGold += baseWidth ** 2;
        } else {
            let circumference = (baseWidth - 1) * 4;
            currentLayer % 5 == 0 ? requiredLapisLazuli += circumference : requiredMarble += circumference;
        } 
        baseWidth -= 2;
    }
    console.log(`Stone required: ${Math.ceil(requiredStone * layerHeight)}`);
    console.log(`Marble required: ${Math.ceil(requiredMarble * layerHeight)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(requiredLapisLazuli * layerHeight)}`);
    console.log(`Gold required: ${Math.ceil(requiredGold * layerHeight)}`);
    console.log(`Final pyramid height: ${Math.floor(currentLayer * layerHeight)}`);

}

calculatePyramidMaterials(11, 1)
calculatePyramidMaterials(11, 0.75)
calculatePyramidMaterials(12, 1)
calculatePyramidMaterials(23, 0.5)