const baseUrl = 'http://localhost:3030/data/movies'


async function loadMoviesData(id = null){
    let url = baseUrl
    if (id != null){
        url += `/${id}`;
    }

    try {
        const res = await fetch(url);
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.message);
        }
        return resData;
    } catch (error) {
        alert(error.message);
    } 
};


export { loadMoviesData };