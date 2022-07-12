function attachEvents() {
    const btn = document.getElementById('submit');
    btn.addEventListener('click', getData);
}

async function getData(e){
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const locationName = document.getElementById('location').value;
    
    try {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error('Error');
        }
        const data = await res.json();
        const locationCode = data.filter(el => el.name == locationName);
   
        if (locationCode.length == 0){
            throw new Error('Error')
        } 
        
        const code = locationCode[0].code;
    
        let [todayResult, upcomingResult] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`),
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
        ]);
        if (!todayResult || !upcomingResult){
            throw new Error('Error')
        }

        const [todayData, upcomingData] = await Promise.all([
            todayResult.json(),
            upcomingResult.json()
        ])

        displayForecast(todayData, upcomingData);

    } catch (error) {
        const forecast = document.getElementById('forecast');
        forecast.textContent = error.message;
        forecast.style.display = 'block';
    }
}

function displayForecast(todayData, upcomingData){
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '';

    let currentData = genGenForecastData(todayData.forecast);
    currentData['name'] = todayData.name
    forecast.appendChild(genTotayForecast(currentData));

    let forecastData = upcomingData.forecast.map(el => genGenForecastData(el));
    forecast.appendChild(genUpcomingForecast(forecastData));

    forecast.style.display = 'block';
}

function genTotayForecast(data){
    const result = e('div', {id: 'current'},
        e('div', {className: 'label'}, 'Current conditions'),
        e('div', {className: 'forecasts'},
            e('span', {className: 'condition symbol'}, data.symbol),
            e('span', {className: 'condition'},
                e('span', {className: 'forecast-data'}, data.name),
                e('span', {className: 'forecast-data'}, data.temp),
                e('span', {className: 'forecast-data'}, data.condition)
            )
        )
    )
    return result;
}

function genUpcomingForecast(data){
    const result = e('div', {id: 'upcoming'},
        e('div', {className: 'label'}, 'Three-day forecast'),
        e('div', {className: 'forecast-info'})
    );

    const info = result.lastChild;
    data.forEach(el => {
        let forecastInfo = e('span', {className:'upcoming'},
            e('span', {className:'symbol'}, el.symbol),
            e('span', {className:'forecast-data'}, el.temp),
            e('span', {className:'forecast-data'}, el.condition)
        )
        info.appendChild(forecastInfo);
    })

    return result;
    
}


function e(type, attributes, ...elements){
    const result = document.createElement(type);

    for (const [attribute, value] of Object.entries(attributes || {})){
        result[attribute] = value;
    }

    for (const el of (elements || [])){
        if (typeof el == 'string' || typeof el == 'number'){
            result.innerHTML = el;
        } else {
            result.appendChild(el);
        }
    }
    return result;
}

function genGenForecastData(data){
    const {condition, high, low} = data;
    let symbol = getSymbol(condition);
    let deg = getSymbol('Degrees');
    let temp = `${low+deg}/${high+deg}`;

    return {symbol, temp, condition}
}

function getSymbol(condition){
    const conditions = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast':	'&#x2601',
        'Rain':	'&#x2614',
        'Degrees': '&#176' 
    }
    return conditions[condition];
}

attachEvents();