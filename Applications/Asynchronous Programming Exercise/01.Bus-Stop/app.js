async function getInfo() {
    const url = 'http://localhost:3030/jsonstore/bus/businfo/';
    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const ul = document.getElementById('buses');

    try {
        ul.innerHTML = '';

        const res = await fetch(url + stopId);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();

        stopName.textContent = data.name;
        for (const [busId, time] of Object.entries(data.buses)){
            let li = document.createElement('li')
            li.textContent = `Bus ${busId} arrives in ${time} minutes`
            ul.appendChild(li);
        }
    } catch (err) {
        stopName.textContent = 'Error'
        console.log(err.message);
    }

}
