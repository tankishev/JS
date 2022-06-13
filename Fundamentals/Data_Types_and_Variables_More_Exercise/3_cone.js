function coneVolume(radius, height){
    radius = Number(radius);
    height = Number(height);
    let volume = radius ** 2 * Math.PI * height / 3;
    let area = Math.PI * radius * (radius + Math.sqrt(height ** 2 + radius ** 2));
    console.log(`volume = ${volume.toFixed(4)}`);
    console.log(`area = ${area.toFixed(4)}`);
}

coneVolume(3.3, 7.8)