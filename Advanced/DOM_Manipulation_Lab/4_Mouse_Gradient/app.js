function attachGradientEvents() {
    const box = document.getElementById('gradient');
    box.addEventListener('mousemove', getPosition);

    function getPosition(event){
        const el = event.target;
        const result = document.getElementById('result')
        let value = Math.floor(100 * event.offsetX / el.clientWidth);
        result.textContent = `${value}%`
    }
}