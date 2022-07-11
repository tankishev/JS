function solve() {
    const stopName = document.querySelector('span.info');
    const url = 'http://localhost:3030/jsonstore/bus/schedule/'
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');

    let nextStopId = 'depot';
    let nextStopName = ''
    
    async function depart() {
        try {
            const res = await fetch(url + nextStopId);
            if (!res.ok){
                throw new Error('Error')
            }
            const data = await res.json();
            nextStopId = data.next
            nextStopName = data.name
            
            stopName.textContent = `Next stop ${nextStopName}`;
            btnDepart.disabled = true;
            btnArrive.disabled = false;
        } catch (error) {
            stopName.textContent = error.message;
            btnDepart.disabled = false;
            btnArrive.disabled = false;
        }
    }

    function arrive() {
        stopName.textContent = `Arriving at ${nextStopName}`;
        btnDepart.disabled = false;
        btnArrive.disabled = true;
    }


    return {
        depart,
        arrive
    };
}

let result = solve();